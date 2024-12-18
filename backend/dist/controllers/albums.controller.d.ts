import { NextFunction, Request, Response } from "express";
import { GetAlbumsResponse } from "shared/src/responses/albums/getAlbums";
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
/**
 * Creates a new album.
 * Route: POST /api/albums
 *
 * Request body:
 * {
 *      albumName: string, // the name of the album
 *      albumDesc: string // the album's description
 * }
 */
export declare const createAlbum: (req: Request, res: Response<GetAlbumsResponse>, next: NextFunction) => Promise<void | Response<{
    createdAt: Date;
    name: string;
    description: string;
}[], Record<string, any>>>;
