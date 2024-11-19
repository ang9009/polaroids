/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { IsSubscribedResponse } from "shared/subbed-channels-responses/isSubscribedResponse";
import HttpStatusCode from "../../../data/httpStatusCode";
import prisma from "../../../lib/prisma";
import ValidationException from "../../../types/error/validationException";
import { IsSubscribedQueryParamsSchema } from "../types/IsSubscribedQueryParamsSchema";

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
  console.log(req.params);
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
