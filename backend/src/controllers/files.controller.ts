/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { MediaFile } from "@prisma/client";
import { isAxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { AllowedMimeType, isAllowedMimeType } from "shared/src/data/allowedMimeType";
import { mimetypeToExtension } from "shared/src/data/mimetypeToExtension";
import { FilterExistingFileIdsRequestSchema } from "shared/src/requests/files/filterExistingFileIds";
import { GetFileLinkRequestSchema } from "shared/src/requests/files/getFileLink";
import { GetFilesRequest, GetFilesRequestSchema } from "shared/src/requests/files/getFiles";
import {
  FilesUploadData,
  UploadFilesRequestBodySchema,
} from "shared/src/requests/files/uploadFiles";
import { FilterExistingFileIdsResponse } from "shared/src/responses/files/filterExistingFileIds";
import { GetFileLinkResponse } from "shared/src/responses/files/getFileLink";
import { GetFilesDataResponse } from "shared/src/responses/files/getFilesData";
import { UploadFilesResponse } from "shared/src/responses/files/uploadFiles";
import HttpStatusCode from "../data/httpStatusCode";
import { getVideoThumbnail } from "../lib/fluentFfmpeg";
import { prisma } from "../lib/prisma";
import { shrinkImage } from "../lib/sharp";
import { AWSFolder, getFileUrl } from "../services/aws/aws";
import { getFileData } from "../services/db/getFileData";
import { uploadFilesAndThumbnails } from "../services/db/uploadFilesAndThumbnails";
import { BufferFile } from "../types/data/bufferFile";
import NotFoundException from "../types/error/notFoundException";
import UnknownException from "../types/error/unknownException";
import ValidationException from "../types/error/validationException";
import { fileFilter } from "../utils/fileFilter";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
import { getFileName } from "../utils/getFSFileName";

const upload = multer({ limits: { fileSize: 2 * 10 ** 9 }, fileFilter: fileFilter }).array("files");

/**
 * Uploads the given files to FileStation, and tracks each photo/video in the
 * database. This also generates scaled down thumbnails for each image and video.
 * Note that each file will be saved as discordId.fileExtension in FileStation.
 *
 * Route: POST /api/files
 *
 * Request Body:
 * {
 *    throwUniqueConstraintError: boolean, // Whether the request should return an
 *                                             error if there is a unique constraint issue
 *    albumName: string, // The name of the album the files should be uploaded to
 *    files: File[], // The files of the photos and/or videos to be uploaded.
 *                      The filename (originalname) should be the Discord attachment id.
 *    filesData: { // Objects containing data relating to each file
 *      discordId: { // The file's Discord attachment id
 *        fileName: string, // The name of the file
 *        createdAt: DateTime? // When the file was uploaded. If undefined, this
 *                                 will default to now
 *        fileLink: string? // A link to the video. This is only required for videos
 *        uploaderId: string, // The discord id of the uploader (user)
 *        fileExtension: string // The file's extension
 *      }
 *      ...
 *    }
 * }
 *
 * Response:
 * {
 *     filesUploaded: number // The number of files that were successfully uploaded
 * }
 */
export const uploadFiles = async (
  req: Request,
  res: Response<UploadFilesResponse>,
  next: NextFunction
) => {
  upload(req, res, async (err) => {
    const parseRes = UploadFilesRequestBodySchema.safeParse(req.body);
    if (!parseRes.success) {
      const error = new ValidationException(parseRes.error);
      return next(error);
    } else if (err instanceof multer.MulterError) {
      const error = new UnknownException(err.code);
      return next(error);
    } else if (!req.files) {
      const error = new UnknownException("'files' property not found in request body");
      return next(error);
    } else if (req.files.length === 0) {
      const error = new UnknownException("No files were provided");
      return next(error);
    }

    const files = req.files as Express.Multer.File[];
    const { albumId, filesData, throwUniqueConstraintError } = parseRes.data!;
    for (const file of files) {
      if (!(file.originalname in filesData)) {
        const error = new UnknownException("One or many files have unmatched filesData properties");
        return next(error);
      } else if (file.mimetype.startsWith("video") && !filesData[file.originalname].fileLink) {
        const error = new UnknownException(
          "Video file " + file.originalname + " doesn't have a file link"
        );
        return next(error);
      }
    }

    let dbFileObjects: MediaFile[]; // Database objects for each image/video (for prisma)
    let mediaFiles: BufferFile[]; // Images/videos converted to BufferFiles (for FS)
    let thumbnailFiles: BufferFile[]; // Thumbnails for each image/video (for FS)
    try {
      mediaFiles = convertToBufferFiles(files, filesData);
      dbFileObjects = getMediaFileObjects(mediaFiles, filesData, albumId);
      thumbnailFiles = await getFileThumbnails(mediaFiles);
    } catch (err) {
      let error = new UnknownException(JSON.stringify(err));
      if (err instanceof Error) {
        error = new UnknownException(err.message);
      }
      return next(error);
    }

    let filesUploaded: number = 0;
    try {
      filesUploaded = await uploadFilesAndThumbnails(
        thumbnailFiles,
        mediaFiles,
        dbFileObjects,
        throwUniqueConstraintError
      );
    } catch (err) {
      if (err instanceof Error) {
        const error = new UnknownException(err.message);
        return next(error);
      }
      const error = getDbExFromPrismaErr(err);
      return next(error);
    }

    res.status(200).send({ filesUploaded });
  });
};

/**
 * Converts Multer files to BufferFile objects.
 */
const convertToBufferFiles = (
  files: Express.Multer.File[],
  fileData: FilesUploadData
): BufferFile[] => {
  const mediaBufferFiles: BufferFile[] = [];
  for (const file of files) {
    if (!isAllowedMimeType(file.mimetype)) {
      throw Error("Disallowed mimetype found: " + file.mimetype);
    }
    const { buffer, originalname: discordId, mimetype } = file;
    const newFile: BufferFile = {
      buffer: buffer,
      discordId: discordId,
      mimetype: mimetype as AllowedMimeType,
      fileLink: fileData[file.originalname].fileLink,
    };
    mediaBufferFiles.push(newFile);
  }
  return mediaBufferFiles;
};

/**
 * Creates scaled down thumbnails for the given array of files.
 */
const getFileThumbnails = async (files: BufferFile[]) => {
  const thumbnails: BufferFile[] = [];
  for (const file of files) {
    let thumbnail: BufferFile;
    if (file.mimetype.startsWith("image")) {
      thumbnail = await shrinkImage(file);
    } else if (file.mimetype.startsWith("video")) {
      if (!file.fileLink) {
        throw Error("Video file is missing video link");
      }
      thumbnail = await getVideoThumbnail(file.discordId, file.fileLink, file.mimetype);
    } else {
      throw Error("Unrecognized mime type");
    }
    thumbnails.push(thumbnail);
  }
  return thumbnails;
};

/**
 * Converts Multer file objects to MediaFile (Prisma compatible) objects.
 */
const getMediaFileObjects = (files: BufferFile[], filesData: FilesUploadData, albumId: string) => {
  return files.map((file) => {
    const fileData = filesData[file.discordId];
    const { createdAt, fileName, uploaderId, fileExtension } = fileData;
    const data: MediaFile = {
      discordId: file.discordId,
      fileName: fileName,
      albumId: albumId,
      createdAt: createdAt,
      uploaderId: uploaderId,
      extension: fileExtension,
      description: null,
    };

    return data;
  });
};

/**
 * Filters a given list of file ids for ids corresponding to files that have not
 * already been uploaded.
 *
 * Route: GET /api/files/filter-existing-ids
 *
 * Request body:
 * {
 *    fileIds: string[], // The list of ids to be filtered
 * }
 *
 * Response body:
 * {
 *    filteredIds: string[], // The list of filtered ids
 * }
 */
export const filterExistingFileIds = async (
  req: Request,
  res: Response<FilterExistingFileIdsResponse>,
  next: NextFunction
) => {
  const parseRes = FilterExistingFileIdsRequestSchema.safeParse(req.query);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { fileIds } = parseRes.data;
  const filteredIds: string[] = [];
  for (const fileId of fileIds) {
    try {
      const count = await prisma.mediaFile.count({
        where: {
          discordId: fileId,
        },
      });
      if (count === 0) {
        filteredIds.push(fileId);
      }
    } catch (err) {
      const error = getDbExFromPrismaErr(err);
      return next(error);
    }
  }

  res.status(HttpStatusCode.OK).send({ filteredIds });
};

/**
 * Retrieves file data paginated via cursor-based pagination.
 *
 * Route: GET /api/files/data
 *
 * Query parameters: see GetFilesRequest
 */
export const getFilesData = async (
  req: Request<GetFilesRequest>,
  res: Response<GetFilesDataResponse>,
  next: NextFunction
) => {
  const parseParams = GetFilesRequestSchema.safeParse(req.query);
  if (!parseParams.success) {
    const error = new ValidationException(parseParams.error);
    return next(error);
  }

  const { cursor, albumId } = parseParams.data;
  if (cursor) {
    const { discordId, createdAt } = cursor;
    const cursorFile = await prisma.mediaFile.findFirst({ where: { discordId, createdAt } });
    if (!cursorFile) {
      const error = new UnknownException(
        `Could not find provided cursor with discordId ${discordId} and createdAt ${createdAt}`
      );
      return next(error);
    }
  }
  if (albumId) {
    const album = await prisma.album.findFirst({ where: { albumId } });
    if (!album) {
      const error = new UnknownException(`Could not find album with albumId ${albumId}`);
      return next(error);
    }
  }

  let fileData;
  const { searchQuery, pageSize } = parseParams.data;
  try {
    fileData = await getFileData(pageSize, cursor, searchQuery, albumId);
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
  fileData = fileData.map((file) => {
    return { ...file, createdAt: file.createdAt.toISOString() };
  });

  res.json({ data: fileData }).status(HttpStatusCode.OK);
};

/**
 * Returns the corresponding urls of the requested media.
 *
 * Route: GET /api/files/download
 *
 * Request query: see DownloadFileRequestSchema
 */
export const getFileLink = async (
  req: Request,
  res: Response<GetFileLinkResponse>,
  next: NextFunction
) => {
  const parseParams = GetFileLinkRequestSchema.safeParse(req.query);
  if (!parseParams.success) {
    const error = new ValidationException(parseParams.error);
    return next(error);
  }

  const { discordId, mimetype, thumbnail } = parseParams.data;
  const resMimetype = thumbnail ? AllowedMimeType.PNG : mimetype;
  const subFolder = thumbnail ? AWSFolder.Thumbnails : AWSFolder.Media;

  let url: string;
  try {
    const fileName = getFileName(discordId, mimetypeToExtension[resMimetype]);
    url = await getFileUrl(fileName, subFolder);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.status === 404) {
        return next(new NotFoundException());
      }
    }
    const error = new UnknownException("An unknown exception occurred: " + err);
    return next(error);
  }

  return res.send({ url }).status(HttpStatusCode.OK);
};
