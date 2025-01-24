import { BufferFile } from "../types/data/bufferFile";
/**
 * Shrinks the given image, resulting in a smaller file size.
 * @param imgFile the file in question
 * @returns the new, smaller image as a PNG
 * @throws an error if the given file is not an image
 */
export declare const shrinkImage: (imgFile: BufferFile) => Promise<BufferFile>;
