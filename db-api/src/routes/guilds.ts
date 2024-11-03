import { Prisma } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import HttpStatusCode from "../data/statusCodes";
import prisma from "../lib/prisma";
import { HttpException } from "../types/error/apiError";
import {
  CreateGuildQueryParams,
  CreateGuildQueryParamsSchema,
} from "../types/request/createGuildQueryParams";
const router = express.Router();

export default router;

// Add a guild
router.post(
  "/",
  async (req: Request<{}, {}, CreateGuildQueryParams>, res: Response, next: NextFunction) => {
    try {
      CreateGuildQueryParamsSchema.parse(req.body);
    } catch (err) {
      if (err instanceof ZodError) {
        const error = new HttpException(HttpStatusCode.BAD_REQUEST, JSON.stringify(err.issues));
        return next(error);
      }
    }

    const { guildId } = req.body;
    try {
      await prisma.guild.create({
        data: {
          guildId: guildId,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const error = new HttpException(HttpStatusCode.BAD_REQUEST, err.code);
        return next(error);
      }
    }

    res.status(HttpStatusCode.OK).json({ msg: "Success" });
  }
);
