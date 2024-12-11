import { FileData } from "../types/fileData";

/**
 * Returns the blob and its name fetched from the given url.
 * @param url the url
 * @param fileName the name of the original file
 * @param discordId the id of the attachment assigned by discord
 * @param createdAt when the file was uploaded
 * @returns the file from the given url and its name
 */
export const getFileDataFromUrl = async (
  url: string,
  fileName: string,
  discordId: string,
  createdAt: Date,
): Promise<FileData> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return { blob: blob, name: fileName, discordId: discordId, createdAt };
};
