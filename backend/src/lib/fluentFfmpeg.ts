import Ffmpeg from "fluent-ffmpeg";
import { AllowedMimeTypes, isAllowedMimeType } from "shared/src/data/allowedMimeTypes";
import { PassThrough } from "stream";
import { BufferFile } from "../types/data/bufferFile";

/**
 * Gets a 400px wide thumbnail from the beginning given video file.
 * @param videoFile the file in question
 * @returns the thumbnail
 */
export const getVideoThumbnail = async (videoFile: Express.Multer.File): Promise<BufferFile> => {
  const { mimetype } = videoFile;
  if (!mimetype.includes("video")) {
    throw Error("videoFile must be an video");
  }
  if (!isAllowedMimeType(mimetype)) {
    throw Error("Mimetype is invalid");
  }
  const bufferStream = new PassThrough();
  Ffmpeg(videoFile.path)
    .takeScreenshots({ count: 2, timemarks: ["00:00:02.000", "6"], size: "150x100" })
    .pipe(bufferStream, { end: true });
  const buffers: Buffer[] = [];
  bufferStream.on("data", (buffer: Buffer) => {
    buffers.push(buffer);
  });
  const bufferPromise = new Promise<ArrayBuffer>((resolve, reject) => {
    bufferStream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    bufferStream.on("error", reject);
  });
  const buffer = await bufferPromise;

  const file: BufferFile = {
    discordId: videoFile.filename,
    buffer,
    mimetype: mimetype as AllowedMimeTypes,
  };
  return file;
};
