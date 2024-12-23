import { NextFunction, Request, Response } from "express";
import { GetSubbedChannelsResponse } from "shared/src/responses/subscribed-channels/getSubbedChannels";
import { IsSubscribedResponse } from "shared/src/responses/subscribed-channels/isSubscribed";
/**
 * Used to get the ids of all the subscribed channels for a given guild and
 * their associated albums.
 * Route: GET /api/subscribed-channels/:guildId
 */
export declare const getAllSubbedChannels: (req: Request, res: Response<GetSubbedChannelsResponse>, next: NextFunction) => Promise<void>;
/**
 * Used to check if polaroids has already subscribed to a channel.
 * Route: GET /api/subscribed-channels/is-subscribed/:id
 */
export declare const channelIsSubscribed: (req: Request, res: Response<IsSubscribedResponse>, next: NextFunction) => Promise<void>;
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
export declare const addSubscribedChannel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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
export declare const updateChannelAlbum: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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
export declare const createAlbumAndLinkChannel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Unsubscribes a given channel from polaroids by removing it its channel id
 * from the database.
 *
 * Route: DELETE /api/subscribed-channels/:channelId
 */
export declare const removeSubscribedChannel: (req: Request, res: Response, next: NextFunction) => Promise<void>;
