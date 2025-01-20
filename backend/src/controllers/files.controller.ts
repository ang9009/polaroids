import { DownloadFileRequestSchema } from "shared/src/requests/files/downloadFile";
import { GetFilesDataResponse } from "shared/src/responses/files/getFilesData";
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { MediaFile } from "@prisma/client";
import { isAxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { extensionToMime } from "shared/src/helpers/getExtensionFromMimeType";
import { FilterExistingFileIdsRequestSchema } from "shared/src/requests/files/filterExistingFileIds";
import { GetFilesRequest, GetFilesRequestSchema } from "shared/src/requests/files/getFiles";
import { UploadFilesRequestBodySchema } from "shared/src/requests/files/uploadFiles";
import { FilterExistingFileIdsResponse } from "shared/src/responses/files/filterExistingFileIds";
import { UploadFilesResponse } from "shared/src/responses/files/uploadFiles";
import HttpStatusCode from "../data/httpStatusCode";
import prisma from "../lib/prisma";
import { getFileData } from "../services/db/getFileData";
import { FileStation } from "../services/filestation/fileStation";
import UnknownException from "../types/error/unknownException";
import ValidationException from "../types/error/validationException";
import { fileFilter } from "../utils/fileFilter";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
import { getFSFileName } from "../utils/getFSFileName";

const upload = multer({ limits: { fileSize: 2 * 10 ** 9 }, fileFilter: fileFilter }).array("files");

/**
 * Uploads the given files to FileStation, and tracks each photo/video in the
 * database. Note that each file will be saved as discordId.fileExtension in FileStation.
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
      }
    }

    const fileObjects = files.map((file) => {
      const fileData = filesData[file.originalname];
      const { createdAt, fileName, uploaderId, fileExtension } = fileData;
      const data: MediaFile = {
        discordId: file.originalname,
        fileName: fileName,
        albumId: albumId,
        createdAt: createdAt,
        uploaderId: uploaderId,
        extension: fileExtension,
        description: null,
      };

      return data;
    });

    let filesUploaded: number = 0;
    try {
      await prisma.$transaction(
        async (tx) => {
          const { count } = await tx.mediaFile.createMany({
            data: fileObjects,
            skipDuplicates: !throwUniqueConstraintError,
          });
          filesUploaded = count;

          await FileStation.uploadFilesToFS(files, "/polaroids/media");
        },
        {
          timeout: 600_000, // 10 minutes YOLO
        }
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
 * Retrieves media from FileStation.
 *
 * Route: GET /api/files/download
 */
export const downloadFile = async (req: Request, res: Response, next: NextFunction) => {
  const parseParams = DownloadFileRequestSchema.safeParse(req.query);
  if (!parseParams.success) {
    const error = new ValidationException(parseParams.error);
    return next(error);
  }

  const { discordId, extension } = parseParams.data;

  let fileData: Buffer;
  try {
    const fileName = getFSFileName(discordId, extension);
    fileData = await FileStation.getFileFromFS(fileName, "/polaroids/media");
  } catch (err) {
    if (isAxiosError(err)) {
      // ! Should create a new error and let it be logged by the error handler
      if (err.status === 404) {
        return res.status(HttpStatusCode.NOT_FOUND).send({ message: "Could not find file" });
      }
    }
    const error = new UnknownException("An unknown exception occurred: " + err);
    return next(error);
  }
  const mimeType = extensionToMime[extension];

  res.contentType(mimeType);
  return res.send(fileData);
};
