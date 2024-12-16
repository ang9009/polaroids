import { AlbumNameQueryParamSchema } from "shared/src/requests/albums/albumExists";
import HttpStatusCode from "../data/statusCodes";
import prisma from "../lib/prisma";
import ValidationException from "../types/error/validationException";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
/**
 * Gets the name of all the albums in the database.
 * Route: GET /api/albums
 */
export const getAlbums = async (req, res, next) => {
    let albums;
    try {
        albums = await prisma.album.findMany({
            orderBy: [{ name: "asc" }],
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    res.status(HttpStatusCode.OK).json(albums);
};
/**
 * Returns whether an album with the given name exists.
 * Route: HEAD /api/albums/album-exists/:albumName
 */
export const albumExists = async (req, res, next) => {
    const reqParams = AlbumNameQueryParamSchema.safeParse(req.params);
    if (!reqParams.success) {
        const error = new ValidationException(reqParams.error);
        return next(error);
    }
    let album;
    try {
        album = await prisma.album.findFirst({
            where: {
                name: reqParams.data.albumName,
            },
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    const albumExists = !!album;
    if (albumExists) {
        res.status(HttpStatusCode.OK).end();
    }
    else {
        res.status(HttpStatusCode.NOT_FOUND).end();
    }
};
