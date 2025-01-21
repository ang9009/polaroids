import { FfmpegCommand } from "fluent-ffmpeg";
import { AllowedMimeTypes, isAllowedMimeType } from "shared/src/data/allowedMimeTypes";
import { PassThrough, Readable } from "stream";
import { BufferFile } from "../types/data/BufferFile";

/**
 * Gets a 400px wide thumbnail from the beginning given video file.
 * @param videoFile the file in question
 * @returns the thumbnail
 */
export const getVideoThumbnail = async (videoFile: Express.Multer.File) => {
  const { mimetype } = videoFile;
  if (!mimetype.includes("image")) {
    throw Error("imgFile must be an image");
  }
  if (isAllowedMimeType(mimetype)) {
    throw Error("Mimetype is invalid");
  }
  const readableStream = Readable.from(videoFile.buffer);
  const bufferStream = new PassThrough();
  new FfmpegCommand(readableStream)
    .takeScreenshots({
      count: 1,
      timemarks: [0],
      size: "400x?",
    })
    .writeToStream(bufferStream);

  const buffer = await getBufferFromStream(bufferStream);
  const file: BufferFile = {
    fileName: videoFile.filename,
    buffer,
    mimetype: mimetype as AllowedMimeTypes,
  };
  return file;
};

/**
 * Gets the resulting buffer from a stream once the stream is complete.
 * @param bufferStream the stream in question
 * @returns the resulting buffer
 */
const getBufferFromStream = async (bufferStream: PassThrough): Promise<ArrayBuffer> => {
  const buffers: Buffer[] = [];
  bufferStream.on("data", (buffer: Buffer) => {
    buffers.push(buffer);
  });
  const bufferRes = new Promise<ArrayBuffer>((resolve, reject) => {
    bufferStream.on("end", () => {
      resolve(Buffer.concat(buffers));
    });
    bufferStream.on("error", reject);
  });
  return await bufferRes;
};
