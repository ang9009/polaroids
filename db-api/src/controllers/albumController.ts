/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { Album } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { GetAlbumsResponse } from "shared/album-responses/getAlbumsResponse";
import HttpStatusCode from "../data/statusCodes";
import prisma from "../lib/prisma";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

/**
 * Gets the name of all the albums in the database.
 * Route: GET /api/albums
 */
export const getAlbums = async (
  req: Request,
  res: Response<GetAlbumsResponse>,
  next: NextFunction,
) => {
  let albums: Album[];
  try {
    albums = await prisma.album.findMany({
      orderBy: [{ albumName: "asc" }],
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(albums);
};

/**
 * Returns whether an album exists.
 * Route: GET /api/album-exists/:albumName
 */
// export const albumExists = async (req: Request, res: Response<>, next: NextFunction) => {};
