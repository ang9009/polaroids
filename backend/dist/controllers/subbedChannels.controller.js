import { AddSubbedChannelRequestSchema } from "shared/src/requests/subscribed-channels/addSubbedChannel";
import { CreateAndLinkAlbumRequestSchema } from "shared/src/requests/subscribed-channels/createAlbumAndLinkChannel";
import { GetSubbedChannelsRequestSchema } from "shared/src/requests/subscribed-channels/getAllSubbedChannels";
import { IsSubscribedQueryParamsSchema } from "shared/src/requests/subscribed-channels/isSubscribed";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { UnsubChannelRequestSchema } from "shared/src/requests/subscribed-channels/unsubChannel";
import { UpdateChannelAlbumRequestSchema } from "shared/src/requests/subscribed-channels/updateChannelAlbum";
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
export const getAllSubbedChannels = async (req, res, next) => {
    const parseRes = GetSubbedChannelsRequestSchema.safeParse(req.params);
    if (!parseRes.success) {
        const error = new ValidationException(parseRes.error);
        return next(error);
    }
    const { guildId } = parseRes.data;
    let subbedChannelsData;
    try {
        subbedChannelsData = await prisma.subscribedChannel.findMany({
            where: {
                guildId: guildId,
            },
            select: {
                channelId: true,
                album: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    res.status(HttpStatusCode.OK).json(subbedChannelsData);
};
/**
 * Used to check if polaroids has already subscribed to a channel.
 * Route: GET /api/subscribed-channels/is-subscribed/:id
 */
export const channelIsSubscribed = async (req, res, next) => {
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
    let response;
    if (channelData) {
        response = {
            isSubscribed: true,
            linkedAlbum: channelData.albumName,
        };
    }
    else {
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
 * Request Body:
 * {
 *   "channelId": string,  // ID of the channel being subscribed to
 *   "guildId": string, // The guild ID that the channel is in
 *   "albumRequestType": AlbumRequestType, // Type of request: create new, or use existing
 *   "albumName": string, // The name of the album to be linked to the channel
 *   "albumDesc": string?, // The description of the album.
 * }
 */
export const addSubscribedChannel = async (req, res, next) => {
    const parseRes = AddSubbedChannelRequestSchema.safeParse(req.body);
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
                        description: albumDesc,
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
        }
        else {
            // If the album already exists, just add the channel as a subscribed channel
            await prisma.subscribedChannel.create({
                data: {
                    channelId: channelId,
                    guildId: guildId,
                    albumName: albumName,
                },
            });
        }
    }
    catch (err) {
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
export const updateChannelAlbum = async (req, res, next) => {
    const parsedRequest = UpdateChannelAlbumRequestSchema.safeParse(req.body);
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
    }
    catch (err) {
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
export const createAlbumAndLinkChannel = async (req, res, next) => {
    const parseRes = CreateAndLinkAlbumRequestSchema.safeParse(req.body);
    if (!parseRes.success) {
        const error = new ValidationException(parseRes.error);
        return next(error);
    }
    const { guildId, channelId, albumName, albumDesc } = parseRes.data;
    try {
        await prisma.$transaction(async (tx) => {
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
    }
    catch (err) {
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
export const removeSubscribedChannel = async (req, res, next) => {
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
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    res.status(HttpStatusCode.OK).json(successJson);
};
