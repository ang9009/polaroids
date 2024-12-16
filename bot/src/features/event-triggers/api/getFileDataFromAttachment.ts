import { Attachment } from "discord.js";
import { FileData } from "../types/fileData";

/**
 * Returns the blob and its name fetched from the given url.
 * @param attachment the attachment in question
 * @param createdAt when the file was uploaded
 * @param uploaderId the id of the user who uploaded this file
 * @returns the attachment as a FileData object
 */
export const getFileDataFromAttachment = async (
  attachment: Attachment,
  createdAt: Date,
  uploaderId: string,
): Promise<FileData> => {
  const { name, id, url } = attachment;
  const res = await fetch(url);
  const blob = await res.blob();
  return {
    blob: blob,
    fileName: name,
    discordId: id,
    createdAt,
    uploaderId,
    description: null,
  };
};
