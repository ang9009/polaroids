import Ffmpeg from "fluent-ffmpeg";
import { AllowedMimeType, isAllowedMimeType } from "shared/src/data/allowedMimeType";
import { PassThrough } from "stream";
/**
 * Creates a 400px wide thumbnail by taking the 1st frame from the given video file.
 * @param discordId the discord id of the video attachment
 * @param fileLink a download link to the file in question
 * @param mimetype the file's mimetype
 * @returns the thumbnail as a PNG
 */
export const getVideoThumbnail = async (discordId, fileLink, mimetype) => {
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
    const buffers = [];
    bufferStream.on("data", (buffer) => {
        buffers.push(buffer);
    });
    const bufferPromise = new Promise((resolve, reject) => {
        bufferStream.on("end", () => {
            resolve(Buffer.concat(buffers));
        });
        bufferStream.on("error", reject);
    });
    const buffer = await bufferPromise;
    const file = {
        discordId,
        buffer,
        mimetype: AllowedMimeType.PNG,
    };
    return file;
};
