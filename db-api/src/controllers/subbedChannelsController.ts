/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { AlbumRequestType } from "shared/subbed-channel-requests/albumRequestType";
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
  next: NextFunction
) => {
  const parseRes = IsSubscribedQueryParamsSchema.safeParse(req.params);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId } = parseRes.data;
  const channelData = await prisma.subscribedChannel.findFirst({
    relationLoadStrategy: "join",
    select: {
      albumName: true,
    },
    where: {
      channelId: channelId,
    },
  });
  const response: IsSubscribedResponse = {
    isSubscribed: !!channelData,
    linkedAlbum: channelData?.albumName,
  };

  res.status(HttpStatusCode.OK).json(response);
};

/**
 * Adds a subscribed channel to the database. This also creates a new album
 * if the albumRequestType is CREATE_NEW.
 *
 * Route: POST /api/subscribed-channels
 *
 * Request Body:
 * {
 *   "channelId": string,  // ID of the channel being subscribed to (required)
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType, // Type of request: create new, or use existing
 *   "albumName": string, // The name of the album to be linked to the channel
 *   "albumDesc": string?, // The description of the album. This must be
 *                            non-null if the albumRequestType is CREATE_NEW.
 * }
 */
export const addSubscribedChannel = async (
  req: Request<ValidationException>,
  res: Response,
  next: NextFunction
) => {
  const parseRes = AddSubChannelBodySchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId, albumName, albumDesc, albumRequestType, guildId } = parseRes.data;
  try {
    if (albumRequestType === AlbumRequestType.CREATE_NEW) {
      await prisma.$transaction(async (tx) => {
        // Create the album
        tx.album.create({
          data: {
            name: albumName,
            description: albumDesc!,
          },
        });

        // Link the channel to the album
        tx.subscribedChannel.create({
          data: {
            channelId: channelId,
            guildId: guildId,
            albumName: albumName,
          },
        });
      });
    } else {
      // If the album already exists, just add the channel as a subscribed channel
      await prisma.subscribedChannel.create({
        data: {
          channelId: channelId,
          guildId: guildId,
          albumName: albumName,
        },
      });
    }
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.CREATED).json(successJson);
};
