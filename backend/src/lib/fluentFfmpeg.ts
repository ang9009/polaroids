import Ffmpeg from "fluent-ffmpeg";
import { AllowedMimeTypes, isAllowedMimeType } from "shared/src/data/allowedMimeTypes";
import { PassThrough } from "stream";
import { BufferFile } from "../types/data/bufferFile";

/**
 * Gets a 400px wide thumbnail from the beginning given video file.
 * @param discordId the discord id of the video attachment
 * @param fileLink a download link to the file in question
 * @param mimetype the file's mimetype
 * @returns the thumbnail
 */
export const getVideoThumbnail = async (
  discordId: string,
  fileLink: string,
  mimetype: string
): Promise<BufferFile> => {
  if (!mimetype.includes("video")) {
    throw Error("videoFile must be an video");
  }
  if (!isAllowedMimeType(mimetype)) {
    throw Error("Mimetype is invalid");
  }

  const bufferStream = new PassThrough();
  Ffmpeg(fileLink)
    .outputOption("-vframes 1")
    .outputFormat("image2")
    .writeToStream(bufferStream, { end: true });

  // Write result to buffer synchronously
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
    discordId,
    buffer,
    mimetype: AllowedMimeTypes.PNG,
  };
  return file;
};
