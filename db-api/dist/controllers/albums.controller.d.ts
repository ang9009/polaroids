import { GetAlbumsResponse } from "shared/src/album-responses/getAlbumsResponse";
import { NextFunction, Request, Response } from "express";
/**
 * Gets the name of all the albums in the database.
 * Route: GET /api/albums
 */
export declare const getAlbums: (req: Request, res: Response<GetAlbumsResponse>, next: NextFunction) => Promise<void>;
/**
 * Returns whether an album with the given name exists.
 * Route: HEAD /api/albums/album-exists/:albumName
 */
export declare const albumExists: (req: Request, res: Response, next: NextFunction) => Promise<void>;
