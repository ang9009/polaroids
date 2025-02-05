/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { CreateFolderRequestSchema } from "shared/src/requests/folders/createFolder";
import HttpStatusCode from "../data/httpStatusCode";
import { prisma } from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

/**
 * Creates a new folder in the specified album/folder.
 *
 * Route: POST /api/folders
 *
 * Body: see CreateFolderRequestSchema
 */
export const createFolder = async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = CreateFolderRequestSchema.safeParse(req.body);
  if (!parseRes.success) {
    return next(new ValidationException(parseRes.error));
  }

  const { albumId, parentFolderId, folderName } = parseRes.data;
  try {
    await prisma.folder.create({
      data: {
        folderName,
        parentFolderId,
        albumId,
      },
    });
  } catch (err) {
    return next(getDbExFromPrismaErr(err));
  }

  return res.status(HttpStatusCode.OK).send({ message: "Folder created" });
};
