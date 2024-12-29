import { NextFunction, Request, Response } from "express";
import { CreateAlbumResponse } from "shared/src/responses/albums/createAlbum";
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
export declare const createAlbum: (req: Request, res: Response<CreateAlbumResponse>, next: NextFunction) => Promise<void | Response<{
    albumId: string;
}, Record<string, any>>>;
/**
 * Changes the name/description of an existing album.
 * Route: PATCH /api/albums
 *
 * Request body:
 * {
 *      albumName: string, // the name of the original album
 *      newAlbumName: string, // the album's new name
 * }
 */
export declare const editAlbum: (req: Request, res: Response, next: NextFunction) => Promise<void>;
/**
 * Deletes an album given its name.
 * Throws an error if the album has any associated files.
 *
 * Route: DELETE /api/albums/:albumId
 */
export declare const deleteAlbum: (req: Request, res: Response, next: NextFunction) => Promise<void>;
