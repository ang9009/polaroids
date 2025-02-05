/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { Album } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AlbumNameQueryParamSchema } from "shared/src/requests/albums/albumExists";
import { CreateAlbumRequestSchema } from "shared/src/requests/albums/createAlbum";
import { DeleteAlbumRequestSchema } from "shared/src/requests/albums/deleteAlbum";
import { EditAlbumRequestSchema } from "shared/src/requests/albums/editAlbum";
import { CreateAlbumResponse } from "shared/src/responses/albums/createAlbum";
import { GetAlbumsResponse } from "shared/src/responses/albums/getAlbums";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import { prisma } from "../lib/prisma";
import UnknownException from "../types/error/unknownException";
import ValidationException from "../types/error/validationException";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";

/**
 * Gets the name of all the albums in the database, and their thumbnails.
 * Route: GET /api/albums
 */
export const getAlbums = async (
  req: Request,
  res: Response<GetAlbumsResponse>,
  next: NextFunction
) => {
  try {
    const albums = await prisma.album.findMany({
      orderBy: [{ createdAt: "asc" }],
      // Include the latest file (and all other album related columns),
      // which serves as the album cover
      include: {
        files: {
          take: 1,
          select: {
            discordId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        // Count the number of files in each album
        _count: {
          select: {
            files: true,
          },
        },
      },
    });

    res.status(HttpStatusCode.OK).json(albums);
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
};

/**
 * Returns whether an album with the given name exists.
 * Route: HEAD /api/albums/album-exists/:albumName
 */
export const albumExists = async (req: Request, res: Response, next: NextFunction) => {
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
  const albumExists: boolean = !!album;

  if (albumExists) {
    res.status(HttpStatusCode.OK).end();
  } else {
    res.status(HttpStatusCode.NOT_FOUND).end();
  }
};

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
export const createAlbum = async (
  req: Request,
  res: Response<CreateAlbumResponse>,
  next: NextFunction
) => {
  const parsedReqBody = CreateAlbumRequestSchema.safeParse(req.body);
  if (!parsedReqBody.success) {
    return next(new ValidationException(parsedReqBody.error));
  }

  const { albumName, albumDesc } = parsedReqBody.data;
  let album: Album;
  try {
    album = await prisma.album.create({
      data: {
        albumName: albumName,
        description: albumDesc,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  return res.status(HttpStatusCode.OK).send({ albumId: album.albumId });
};

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
export const editAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const parsedReqBody = EditAlbumRequestSchema.safeParse(req.body);
  if (!parsedReqBody.success) {
    const error = new ValidationException(parsedReqBody.error);
    return next(error);
  }

  const { albumId, newAlbumName, newAlbumDesc } = parsedReqBody.data;
  try {
    await prisma.album.update({
      data: {
        albumName: newAlbumName,
        description: newAlbumDesc,
      },
      where: {
        albumId: albumId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.status(HttpStatusCode.OK).send(successJson);
};

/**
 * Deletes an album given its name.
 * Throws an error if the album has any associated files.
 *
 * Route: DELETE /api/albums/:albumId
 */
export const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const parsedReqBody = DeleteAlbumRequestSchema.safeParse(req.params);
  if (!parsedReqBody.success) {
    const error = new ValidationException(parsedReqBody.error);
    return next(error);
  }
  const { albumId } = parsedReqBody.data;

  let filesCount: number;
  try {
    filesCount = await prisma.mediaFile.count({
      where: {
        albumId: albumId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }
  if (filesCount !== 0) {
    const error = new UnknownException("Albums that have associated files cannot be deleted");
    return next(error);
  }

  try {
    await prisma.album.delete({
      where: {
        albumId: albumId,
      },
    });
  } catch (err) {
    const error = getDbExFromPrismaErr(err);
    return next(error);
  }

  res.json(successJson).status(HttpStatusCode.OK);
};
