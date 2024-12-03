/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";

/**
 * Uploads the given media to FileStation, and tracks each photo/video in the database.
 * Route: POST /api/media
 */
export const uploadMedia = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files);
};
