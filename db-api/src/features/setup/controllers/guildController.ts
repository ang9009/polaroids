import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../../../data/httpStatusCode";
import successJson from "../../../data/successJson";
import prisma from "../../../lib/prisma";
import ValidationException from "../../../types/error/validationException";
import { getDbExFromPrismaErr } from "../../../utils/getDbExFromPrismaErr";
import { CreateGuildQueryParamsSchema } from "../types/createGuildQueryParams";

/**
 * Adds a guild to the Postgres database.
 * Route: POST /api/guilds
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns void
 */
export const addGuild = async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = CreateGuildQueryParamsSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { guildId, albumId } = parseRes.data;
  try {
    await prisma.guild.create({
      data: {
        guildId: guildId,
        albumId: albumId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
};
