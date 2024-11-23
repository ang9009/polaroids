/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { IsSubscribedResponse } from "shared/subbed-channels-responses/isSubscribedResponse";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { AddSubChannelBodySchema } from "../types/query-params/addSubChannelBodySchema";
import { IsSubscribedQueryParamsSchema } from "../types/query-params/isSubscribedQueryParamsSchema";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

/**
 * Used to check if polaroids has already subscribed to a channel.
 * Route: GET /api/subscribed-channels/is-subscribed/:id
 */
export const channelIsSubscribed = async (
  req: Request,
  res: Response<IsSubscribedResponse>,
  next: NextFunction,
) => {
  const parseRes = IsSubscribedQueryParamsSchema.safeParse(req.params);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId } = parseRes.data;
  const channelCount = await prisma.subscribedChannel.count({
    where: {
      channelId: channelId,
    },
  });
  const response: IsSubscribedResponse = { isSubscribed: channelCount !== 0 };

  res.status(HttpStatusCode.OK).json(response);
};

/**
 * Adds a subscribed channel to the database.
 * Route: POST /api/subscribed-channels
 */
export const addSubscribedChannel = async (
  req: Request<ValidationException>,
  res: Response,
  next: NextFunction,
) => {
  const parseRes = AddSubChannelBodySchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId, albumName, guildId } = parseRes.data;
  try {
    await prisma.subscribedChannel.create({
      data: {
        channelId: channelId,
        albumName: albumName,
        guildId: guildId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.CREATED).json(successJson);
};
