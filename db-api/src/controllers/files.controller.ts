/* eslint-disable jsdoc/require-param */
import { UploadFilesReqBodySchema } from "shared/src/file-requests/UploadFilesReqBody";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
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
 *    files: File[] // The files of the photos and/or videos to be uploaded
 *    ids?: string[] // An optional list of unique ids, which will be assigned to the files
 *                      in the given order
 * }
 */
export const uploadFiles = async (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, async (err) => {
    const parseRes = UploadFilesReqBodySchema.safeParse(req.body);
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
    // Try to upload the files to FileStation before saving the image data to
    // the database
    const files = req.files as Express.Multer.File[];
    try {
      await uploadFilesToFS(files);
    } catch (err) {
      if (err instanceof Error) {
        const error = new UnknownException(err.message);
        return next(error);
      }
    }

    const { albumName, ids } = parseRes.data!;
    if (ids && ids.length !== files.length) {
      const error = new UnknownException("Number of ids must match number of files uploaded");
      return next(error);
    }

    // ! Also try and upload a non-image/video and see the err message
    const fileData = files.map((file, i) => {
      return {
        fileId: ids ? ids[i] : uuidv4(),
        fileName: file.originalname,
        albumName: albumName,
      };
    });

    try {
      await prisma.file.createMany({
        data: fileData,
        skipDuplicates: true,
      });
    } catch (err) {
      const error = getDbExFromPrismaErr(err);
      return next(error);
    }

    res.status(200).send(successJson);
  });
};
