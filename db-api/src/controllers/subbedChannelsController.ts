import { GetSubbedChannelsResponse } from "shared/src/subbed-channels-responses/getSubbedChannelsResponse";
import { GetAllSubbedChannelsReqSchema } from "./../../../bot/node_modules/shared/src/subbed-channel-requests/getAllSubbedChannelsReq";
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */

import { SubscribedChannel } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AlbumRequestType } from "shared/src/subbed-channel-requests/albumRequestType";
import { UpdateChannelAlbumReqSchema } from "shared/src/subbed-channel-requests/updateChannelAlbumReq";
import { IsSubscribedResponse } from "shared/src/subbed-channels-responses/isSubscribedResponse";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { AddSubChannelReqBodySchema } from "../types/request-schemas/addSubChannelReqBody";
import { IsSubscribedQueryParamsSchema } from "../types/request-schemas/isSubscribedQueryParams";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
import { CreateAndLinkAlbumSchema } from "./../../node_modules/shared/src/subbed-channel-requests/createAlbumAndLinkChannelReqBody";

/**
 * Used to get the ids of all the subscribed channels for a given guild.
 * Route: GET /api/subscribed-channels/:guildId
 */
export const getAllSubbedChannels = async (
  req: Request,
  res: Response<GetSubbedChannelsResponse>,
  next: NextFunction
) => {
  const parseRes = GetAllSubbedChannelsReqSchema.safeParse(req.params);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { guildId } = parseRes.data;
  let subbedChannels: SubscribedChannel[];
  try {
    subbedChannels = await prisma.subscribedChannel.findMany({
      where: {
        guildId: guildId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
  const channelIds = subbedChannels.map((channel) => channel.channelId);
  res.status(HttpStatusCode.OK).json({ channelIds: channelIds });
};

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
 *   "channelId": string,  // ID of the channel being subscribed to
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType, // Type of request: create new, or use existing
 *   "albumName": string, // The name of the album to be linked to the channel
 *   "albumDesc": string?, // The description of the album. This must be
 *                            non-null if the albumRequestType is CREATE_NEW.
 * }
 */
export const addSubscribedChannel = async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = AddSubChannelReqBodySchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId, albumName, albumDesc, albumRequestType, guildId } = parseRes.data;
  try {
    if (albumRequestType === AlbumRequestType.CREATE_NEW) {
      await prisma.$transaction(async (tx) => {
        // Create the album
        await tx.album.create({
          data: {
            name: albumName,
            description: albumDesc!,
          },
        });

        // Link the channel to the album
        await tx.subscribedChannel.create({
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

/**
 * Changes the linked album that a channel that is already subscribed to.
 *
 * Route: PATCH /api/subscribed-channels/link-existing-album
 *
 * Request Body:
 * {
 *   "albumName": string, // The name of the album to be linked to the channel
 * }
 */
export const updateChannelAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const parsedRequest = UpdateChannelAlbumReqSchema.safeParse(req.body);
  if (!parsedRequest.success) {
    const error = new ValidationException(parsedRequest.error);
    return next(error);
  }

  const { albumName, channelId, guildId } = parsedRequest.data;
  try {
    await prisma.subscribedChannel.update({
      where: {
        channelId: channelId,
        guildId: guildId,
      },
      data: {
        albumName: albumName,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
};

/**
 * Creates a new album, then links an existing channel to it.
 *
 * Route: PATCH /api/subscribed-channels/link-new-album
 *
 * Request Body:
 * {
 *   "channelId": string,  // ID of the channel being subscribed to
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType, // Type of request: create new, or use existing
 *   "albumName": string, // The name of the album to be linked to the channel
 *   "albumDesc": string?, // The description of the album. This must be
 *                            non-null if the albumRequestType is CREATE_NEW.
 * }
 */
export const createAlbumAndLinkChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parseRes = CreateAndLinkAlbumSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { guildId, channelId, albumName, albumDesc } = parseRes.data;
  try {
    prisma.$transaction(async (tx) => {
      await tx.album.create({
        data: {
          name: albumName,
          description: albumDesc,
        },
      });

      await tx.subscribedChannel.update({
        where: {
          guildId: guildId,
          channelId: channelId,
        },
        data: {
          albumName: albumName,
        },
      });
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
};
