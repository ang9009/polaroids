import { NextFunction, Request, Response } from "express";
/**
 * Uploads the given media to FileStation, and tracks each photo/video in the database.
 *
 * Route: POST /api/media
 *
 * Request Body:
 * {
 *    albumName: string, // The name of the album the files should be uploaded to
 *    files: File[] // The files of the photos and/or videos to be uploaded
 * }
 */
export declare const uploadMedia: (req: Request, res: Response, next: NextFunction) => Promise<void>;
