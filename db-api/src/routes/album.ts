import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/httpStatusCode";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { CreateAlbumQueryParamsSchema } from "../types/request/createAlbumQueryParams";
import getDbExceptionFromPrismaErr from "../utils/getDbExFromPrismaErr";

const router = express.Router();

// Create an album
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = CreateAlbumQueryParamsSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }
  const { albumId, albumName, guildId } = parseRes.data;

  try {
    // ! Create transaction and throw error if something happens with FileStation
    await prisma.$transaction(async (tx) => {
      await tx.album.create({
        data: {
          guildId: guildId,
          albumId: albumId,
          albumName: albumName,
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) {
      return next(error);
    } else {
      const dbError = getDbExceptionFromPrismaErr(error);
      return next(dbError);
    }
  }

  res.status(HttpStatusCode.OK).json(successJson);
});

export default router;
