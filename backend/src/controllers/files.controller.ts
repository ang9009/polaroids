/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { FilterExistingFileIdsRequestSchema } from "shared/src/requests/files/filterExistingFileIds";
import { GetFilesRequestSchema } from "shared/src/requests/files/getFiles";
import { UploadFilesRequestBodySchema } from "shared/src/requests/files/uploadFiles";
import { FilterExistingFileIdsResponse } from "shared/src/responses/files/filterExistingFileIds";
import { UploadFilesResponse } from "shared/src/responses/files/getFiles";
import prisma from "../lib/prisma";
import { getFileData } from "../services/db/getFileData";
import { uploadFilesToFS } from "../services/filestation/uploadFilesToFS";
import UnknownException from "../types/error/unknownException";
import ValidationException from "../types/error/validationException";
import { fileFilter } from "../utils/fileFilter";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

const upload = multer({ limits: { fileSize: 2 * 10 ** 9 }, fileFilter: fileFilter }).array("files");

/**
 * Uploads the given files to FileStation, and tracks each photo/video in the database.
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
      const { createdAt, fileName, uploaderId } = fileData;

      return {
        discordId: file.originalname,
        fileName: fileName,
        albumId: albumId,
        createdAt: createdAt,
        uploaderId: uploaderId,
      };
    });

    let filesUploaded: number = 0;
    try {
      await prisma.$transaction(
        async (tx) => {
          const { count } = await tx.file.createMany({
            data: fileObjects,
            skipDuplicates: !throwUniqueConstraintError,
          });
          filesUploaded = count;

          await uploadFilesToFS(files);
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
      const count = await prisma.file.count({
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

  res.status(HttpStatusCode.Ok).send({ filteredIds });
};

/**
 * Retrieves files paginated via cursor-based pagination.
 *
 * Route: GET /api/files
 *
 */
export const getFiles = async (req: Request, res: Response, next: NextFunction) => {
  const parseParams = GetFilesRequestSchema.safeParse(req.query);
  if (!parseParams.success) {
    const error = new ValidationException(parseParams.error);
    return next(error);
  }

  let fileData: { discordId: string }[];
  try {
    fileData = await getFileData(parseParams.data);
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  const fileStationQuery = fileData.map((file) => file.discordId).join(",");
};
