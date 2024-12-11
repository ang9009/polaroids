/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { UploadFilesReqBodySchema } from "shared/src/file-requests/UploadFilesReqBody";
import { v4 as uuidv4 } from "uuid";
import { uploadFilesToFS } from "../api/uploadFilesToFS";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import UnknownException from "../types/error/genericException";
import ValidationException from "../types/error/validationException";
import { fileFilter } from "../utils/fileFilter";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

const upload = multer({ limits: { fileSize: 2 * 10 ** 9 }, fileFilter: fileFilter }).array(
  "files",
  15
);

/**
 * Uploads the given files to FileStation, and tracks each photo/video in the database.
 *
 * Route: POST /api/files
 *
 * Request Body:
 * {
 *    albumName: string, // The name of the album the files should be uploaded to
 *    files: File[], // The files of the photos and/or videos to be uploaded.
 *                      The filename should be unique, as it will be used as the file's id.
 *    filesData: { // Objects containing data relating to each file
 *      fileId: {
 *        fileName: string, // The name of the file
 *        createdAt: DateTime? // When the file was uploaded. If undefined, this
 *                                 will default to now
 *      }
 *      ...
 *    }
 * }
 */
export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, async (err) => {
    const parseRes = UploadFilesReqBodySchema.safeParse(req.body);
    console.log(parseRes.error);
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
    // Make sure that nothing goes wrong with FS upload before updating database
    const files = req.files as Express.Multer.File[];
    try {
      await uploadFilesToFS(files);
    } catch (err) {
      if (err instanceof Error) {
        const error = new UnknownException(err.message);
        return next(error);
      }
    }

    const { albumName, filesData } = parseRes.data!;
    const fileObjects = files.map((file) => {
      const fileData = filesData[file.filename];
      const fileId = fileData ? fileData.fileName : uuidv4();
      const createdAt = fileData ? fileData.createdAt : undefined;

      return {
        fileId: fileId,
        fileName: file.originalname,
        albumName: albumName,
        createdAt: createdAt,
      };
    });

    try {
      await prisma.file.createMany({
        data: fileObjects,
        skipDuplicates: true,
      });
    } catch (err) {
      const error = getDbExFromPrismaErr(err);
      return next(error);
    }

    res.status(200).send(successJson);
  });
};
