import { AllowedMimeTypes, isAllowedMimeType } from "shared/src/data/allowedMimeTypes";
import sharp from "sharp";
import { Readable } from "stream";
import { BufferFile } from "../types/data/bufferFile";

/**
 * Shrinks the given image, resulting in a smaller file size.
 * @param imgFile the file in question
 * @returns the new, smaller image
 * @throws an error if the given file is not an image
 */
export const shrinkImage = async (imgFile: Express.Multer.File): Promise<BufferFile> => {
  const { mimetype } = imgFile;
  if (!mimetype.includes("image")) {
    throw Error("imgFile must be an image");
  } else if (!isAllowedMimeType(mimetype)) {
    throw Error("File is not of an allowed MIME type: " + mimetype);
  }

  const readableStream = Readable.from(imgFile.buffer);
  const transformer = sharp().resize(400);
  const newBuffer = await readableStream.pipe(transformer).toBuffer();
  const file: BufferFile = {
    discordId: imgFile.originalname,
    buffer: newBuffer,
    mimetype: mimetype as AllowedMimeTypes,
  };
  return file;
};
