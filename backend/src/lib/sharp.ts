import sharp from "sharp";
import { Readable } from "stream";

/**
 * Shrinks the given image, resulting in a smaller file size.
 * @param imgFile the file in question
 * @returns the new, smaller image
 */
export const shrinkImage = async (imgFile: Express.Multer.File) => {
  const readableStream = Readable.from(imgFile.buffer);
  const transformer = sharp().resize(200);
  const newBuffer = await readableStream.pipe(transformer).toBuffer();
  const file: Express.Multer.File = {
    ...imgFile,
    buffer: newBuffer,
  };
  return file;
};
