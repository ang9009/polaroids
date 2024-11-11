import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/httpStatusCode";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import RequestException from "../types/error/requestException";
import { CreateGuildQueryParamsSchema } from "../types/request/createGuildQueryParams";
import getExceptionFromPrismaErr from "../utils/getDbExFromPrismaErr";

const router = express.Router();

// Add a guild
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = CreateGuildQueryParamsSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new RequestException(parseRes.error);
    return next(error);
  }

  const { guildId } = parseRes.data;
  try {
    await prisma.guild.create({
      data: {
        guildId: guildId,
      },
    });
  } catch (err) {
    const error = getExceptionFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
});

export default router;
