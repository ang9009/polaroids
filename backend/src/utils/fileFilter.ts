import { Request } from "express";
import { FileFilterCallback } from "multer";
import { mimetypeToExtension } from "shared/src/data/mimetypeToExtension";

/**
 * File filter to ensure that only images and videos are uploaded.
 * @param req request object
 * @param file file object
 * @param cb Multer's file filter callback
 */
export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (mimetypeToExtension[file.mimetype]) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
