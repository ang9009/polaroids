import express, { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import RequestException from "../types/error/requestException";
import {
  CreateGuildQueryParams,
  CreateGuildQueryParamsSchema,
} from "../types/request/createGuildQueryParams";
import handleDbException from "../utils/handleDbException";

const router = express.Router();

// Add a guild
router.post(
  "/",
  async (req: Request<{}, {}, CreateGuildQueryParams>, res: Response, next: NextFunction) => {
    const parseRes = CreateGuildQueryParamsSchema.safeParse(req.body);
    if (!parseRes.success) {
      const error = new RequestException(parseRes.error);
      return next(error);
    }

    const { guildId } = req.body;
    try {
      await prisma.guild.create({
        data: {
          guildId: guildId,
        },
      });
    } catch (err) {
      return handleDbException(err, next);
    }

    res.status(HttpStatusCode.OK).json(successJson);
  },
);

export default router;
