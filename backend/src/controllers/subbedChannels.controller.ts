/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { AddSubbedChannelRequestSchema } from "shared/src/requests/subscribed-channels/addSubbedChannel";
import { CreateAndLinkAlbumRequestSchema } from "shared/src/requests/subscribed-channels/createAlbumAndLinkChannel";
import { GetSubbedChannelsRequestSchema } from "shared/src/requests/subscribed-channels/getAllSubbedChannels";
import { IsSubscribedQueryParamsSchema } from "shared/src/requests/subscribed-channels/isSubscribed";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { UnsubChannelRequestSchema } from "shared/src/requests/subscribed-channels/unsubChannel";
import { UpdateChannelAlbumRequestSchema } from "shared/src/requests/subscribed-channels/updateChannelAlbum";
import { GetSubbedChannelsResponse } from "shared/src/responses/subscribed-channels/getSubbedChannels";
import { IsSubscribedResponse } from "shared/src/responses/subscribed-channels/isSubscribed";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

/**
 * Used to get the ids of all the subscribed channels for a given guild and
 * their associated albums.
 * Route: GET /api/subscribed-channels/:guildId
 */
export const getAllSubbedChannels = async (
  req: Request,
  res: Response<GetSubbedChannelsResponse>,
  next: NextFunction
) => {
  const parseRes = GetSubbedChannelsRequestSchema.safeParse(req.params);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { guildId } = parseRes.data;
  let subbedChannelsData: GetSubbedChannelsResponse;
  try {
    subbedChannelsData = await prisma.subscribedChannel.findMany({
      where: {
        guildId: guildId,
      },
      select: {
        channelId: true,
        album: {
          select: {
            albumName: true,
          },
        },
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(subbedChannelsData);
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
      album: {
        select: {
          albumId: true,
          albumName: true,
        },
      },
    },
    where: {
      channelId: channelId,
    },
  });
  let response: IsSubscribedResponse;

  if (channelData) {
    response = {
      isSubscribed: true,
      linkedAlbumId: channelData.album.albumId,
      linkedAlbumName: channelData.album.albumName,
    };
  } else {
    response = {
      isSubscribed: false,
    };
  }

  res.status(HttpStatusCode.OK).json(response);
};

/**
 * Adds a subscribed channel to the database. This also creates a new album
 * if the albumRequestType is CREATE_NEW.
 *
 * Route: POST /api/subscribed-channels
 *
 * Request Body (for creating an album):
 * {
 *   "channelId": string,  // ID of the channel being subscribed to
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType.CREATE_NEW
 *   "albumName": string, // The name of the album to be linked to the channel
 *   "albumDesc": string, // The description of the album.
 * }
 *
 * Request Body (for linking an existing album):
 * {
 *   "albumId": string, // The id of the album to be linked to the channel
 *   "channelId": string,  // ID of the channel being subscribed to
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType.EXISTING
 * }
 */
export const addSubscribedChannel = async (req: Request, res: Response, next: NextFunction) => {
  const parseRes = AddSubbedChannelRequestSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { channelId, albumRequestType, guildId } = parseRes.data;
  try {
    if (albumRequestType === AlbumRequestType.CREATE_NEW) {
      const { albumName, albumDesc } = parseRes.data;
      await prisma.$transaction(async (tx) => {
        // Create the album
        const album = await tx.album.create({
          data: {
            albumName: albumName,
            description: albumDesc!,
          },
        });

        // Link the channel to the album
        await tx.subscribedChannel.create({
          data: {
            channelId: channelId,
            guildId: guildId,
            albumId: album.albumId,
          },
        });
      });
    } else {
      const { albumId } = parseRes.data;
      // If the album already exists, just add the channel as a subscribed channel
      await prisma.subscribedChannel.create({
        data: {
          channelId: channelId,
          guildId: guildId,
          albumId: albumId,
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
 *   "albumId": string, // The id of the album to be linked to the channel
 * }
 */
export const updateChannelAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const parsedRequest = UpdateChannelAlbumRequestSchema.safeParse(req.body);
  if (!parsedRequest.success) {
    const error = new ValidationException(parsedRequest.error);
    return next(error);
  }

  const { albumId, channelId, guildId } = parsedRequest.data;
  try {
    await prisma.subscribedChannel.update({
      where: {
        channelId: channelId,
        guildId: guildId,
      },
      data: {
        albumId: albumId,
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
  const parseRes = CreateAndLinkAlbumRequestSchema.safeParse(req.body);
  if (!parseRes.success) {
    const error = new ValidationException(parseRes.error);
    return next(error);
  }

  const { guildId, channelId, albumName, albumDesc } = parseRes.data;
  try {
    await prisma.$transaction(async (tx) => {
      const album = await tx.album.create({
        data: {
          albumName: albumName,
          description: albumDesc,
        },
      });

      await tx.subscribedChannel.update({
        where: {
          guildId: guildId,
          channelId: channelId,
        },
        data: {
          albumId: album.albumId,
        },
      });
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
};

/**
 * Unsubscribes a given channel from polaroids by removing it its channel id
 * from the database.
 *
 * Route: DELETE /api/subscribed-channels/:channelId
 */
export const removeSubscribedChannel = async (req: Request, res: Response, next: NextFunction) => {
  const parsedRequest = UnsubChannelRequestSchema.safeParse(req.params);
  if (!parsedRequest.success) {
    const error = new ValidationException(parsedRequest.error);
    return next(error);
  }
  const { channelId } = parsedRequest.data;

  try {
    await prisma.subscribedChannel.delete({
      where: {
        channelId: channelId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(successJson);
};
