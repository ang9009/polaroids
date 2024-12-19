import { AlbumNameQueryParamSchema } from "shared/src/requests/albums/albumExists";
import { DeleteAlbumRequestSchema } from "shared/src/requests/albums/deleteAlbum";
import { EditAlbumRequestSchema } from "shared/src/requests/albums/editAlbum";
import { CreateAlbumRequestSchema } from "../../../bot/node_modules/shared/src/requests/albums/createAlbum";
import HttpStatusCode from "../data/statusCodes";
import successJson from "../data/successJson";
import prisma from "../lib/prisma";
import UnknownException from "../types/error/unknownException";
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
export const createAlbum = async (req, res, next) => {
    const parsedReqBody = CreateAlbumRequestSchema.safeParse(req.body);
    if (!parsedReqBody.success) {
        const error = new ValidationException(parsedReqBody.error);
        return next(error);
    }
    const { albumName, albumDesc } = parsedReqBody.data;
    try {
        await prisma.album.create({
            data: {
                name: albumName,
                description: albumDesc,
            },
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    return res.status(HttpStatusCode.OK).send(successJson);
};
/**
 * Changes the name/description of an existing album.
 * Route: PATCH /api/albums
 *
 * Request body:
 * {
 *      albumName: string, // the name of the original album
 *      newAlbumName: string, // the album's new name
 *      newAlbumDesc: string // the album's new description
 * }
 */
export const editAlbum = async (req, res, next) => {
    const parsedReqBody = EditAlbumRequestSchema.safeParse(req.body);
    if (!parsedReqBody.success) {
        const error = new ValidationException(parsedReqBody.error);
        return next(error);
    }
    const { albumName, newAlbumName, newAlbumDesc } = parsedReqBody.data;
    try {
        await prisma.album.update({
            data: {
                name: newAlbumName,
                description: newAlbumDesc,
            },
            where: {
                name: albumName,
            },
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    res.status(HttpStatusCode.OK).send(successJson);
};
/**
 * Deletes an album given its name.
 * Throws an error if the album has any associated files.
 *
 * Route: DELETE /api/albums/:albumName
 */
export const deleteAlbum = async (req, res, next) => {
    const parsedReqBody = DeleteAlbumRequestSchema.safeParse(req.params);
    if (!parsedReqBody.success) {
        const error = new ValidationException(parsedReqBody.error);
        return next(error);
    }
    const { albumName } = parsedReqBody.data;
    let filesCount;
    try {
        filesCount = await prisma.file.count({
            where: {
                albumName: albumName,
            },
        });
    }
    catch (err) {
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
                name: albumName,
            },
        });
    }
    catch (err) {
        const error = getDbExFromPrismaErr(err);
        return next(error);
    }
    res.json(successJson).status(HttpStatusCode.OK);
};
