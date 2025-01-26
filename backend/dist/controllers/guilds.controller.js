import { GuildQueryParamsSchema } from "shared/src/requests/guilds/guildQueryParams";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import { prisma } from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
/**
 * Adds a guild to the Postgres database.
 * Route: POST /api/guilds
 */
export const addGuild = async (req, res, next) => {
  const parseRes = GuildQueryParamsSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
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
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
  res.status(HttpStatusCode.OK).json(successJson);
};
/**
 * Deletes a guild from the Postgres database.
 * Route: DELETE /api/guilds/:guildId
 * @param req request object
 * @param res result object
 * @param next next function
 * @returns void
 */
export const deleteGuild = async (req, res, next) => {
  const parseRes = GuildQueryParamsSchema.safeParse(req.params);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }
  const { guildId } = parseRes.data;
  try {
    await prisma.guild.delete({
      where: {
        guildId: guildId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
  res.status(HttpStatusCode.OK).json(successJson);
};
