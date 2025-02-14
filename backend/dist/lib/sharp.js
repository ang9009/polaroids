import { AllowedMimeType, isAllowedMimeType } from "shared/src/data/allowedMimeType";
import sharp from "sharp";
import { Readable } from "stream";
/**
 * Shrinks the given image, resulting in a smaller file size.
 * @param imgFile the file in question
 * @returns the new, smaller image as a PNG
 * @throws an error if the given file is not an image
 */
export const shrinkImage = async (imgFile) => {
    const { mimetype } = imgFile;
    if (!mimetype.includes("image")) {
        throw Error("imgFile must be an image");
    }
    else if (!isAllowedMimeType(mimetype)) {
        throw Error("File is not of an allowed MIME type: " + mimetype);
    }
    const readableStream = Readable.from(Buffer.from(imgFile.buffer));
    const transformer = sharp().resize(400);
    const newBuffer = await readableStream.pipe(transformer).toBuffer();
    const file = {
        discordId: imgFile.discordId,
        buffer: newBuffer,
        mimetype: AllowedMimeType.PNG,
    };
    return file;
};
