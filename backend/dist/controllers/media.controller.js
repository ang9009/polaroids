import multer from "multer";
import { UploadMediaRequestSchema } from "shared/src/media-requests/UploadMediaRequest";
import { uploadFilesToFS } from "../api/uploadFilesToFS";
import successJson from "../data/successJson";
import { prisma } from "../lib/prisma";
import UnknownException from "../types/error/genericException";
import ValidationException from "../types/error/validationException";
import { fileFilter } from "../utils/fileFilter";
import { getDbExFromPrismaErr } from "../utils/getDbExFromPrismaErr";
const upload = multer({ limits: { fileSize: 2 * 10 ** 9 }, fileFilter: fileFilter }).array(
  "files",
  15
);
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
export const uploadMedia = async (req, res, next) => {
  upload(req, res, async (err) => {
    const parseRes = UploadMediaRequestSchema.safeParse(req.body);
    if (!parseRes.success) {
      const error = new ValidationException(parseRes.error);
      return next(error);
    } else if (err instanceof multer.MulterError) {
      const error = new UnknownException(err.code);
      return next(error);
    } else if (!req.files) {
      const error = new UnknownException("'files' property not found in request body");
      return next(error);
    } else if (req.files.length === 0) {
      const error = new UnknownException("No files were provided");
      return next(error);
    }
    // Try to upload the files to FileStation first
    const files = req.files;
    try {
      await uploadFilesToFS(files);
    } catch (err) {
      if (err instanceof Error) {
        const error = new UnknownException(err.message);
        return next(error);
      }
    }
    const { albumName } = parseRes.data;
    const mediaArr = files.map((file) => {
      return { mediaId: file.originalname, albumName: albumName, description: null };
    });
    try {
      await prisma.media.createMany({ data: mediaArr, skipDuplicates: true });
    } catch (err) {
      const error = getDbExFromPrismaErr(err);
      return next(error);
    }
    res.status(200).send(successJson);
  });
};
