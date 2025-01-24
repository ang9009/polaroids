import { BufferFile } from "../types/data/bufferFile";
/**
 * Creates a 400px wide thumbnail by taking the 1st frame from the given video file.
 * @param discordId the discord id of the video attachment
 * @param fileLink a download link to the file in question
 * @param mimetype the file's mimetype
 * @returns the thumbnail as a PNG
 */
export declare const getVideoThumbnail: (discordId: string, fileLink: string, mimetype: string) => Promise<BufferFile>;
