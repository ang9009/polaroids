/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { Album } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AlbumExistsResponse } from "shared/album-responses/albumExistsResponse";
import { GetAlbumsResponse } from "shared/album-responses/getAlbumsResponse";
import HttpStatusCode from "../data/statusCodes";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { AlbumNameQueryParamSchema } from "../types/query-params/albumNameQueryParam";
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
 * Returns whether an album with the given name exists.
 * Route: GET /api/albums/album-exists/:albumName
 */
export const albumExists = async (
  req: Request,
  res: Response<AlbumExistsResponse>,
  next: NextFunction,
) => {
  const reqParams = AlbumNameQueryParamSchema.safeParse(req.params);
  if (!reqParams.success) {
    const error = new ValidationException(reqParams.error);
    return next(error);
  }

  let album: Album | null;
  try {
    album = await prisma.album.findFirst({
      where: {
        albumName: reqParams.data.albumName,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json({ albumExists: !!album });
};
