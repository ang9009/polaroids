import { Attachment } from "discord.js";
import { AllowedMimeType } from "shared/src/data/allowedMimeType";
import { getExtensionFromMimetype } from "shared/src/helpers/getExtensionFromMimeType";
import { MediaFileData } from "../types/fileData";

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
): Promise<MediaFileData> => {
  const { name, id, url } = attachment;
  const res = await fetch(url);
  const blob = await res.blob();
  return {
    extension: getExtensionFromMimetype(attachment.contentType! as AllowedMimeType),
    blob: blob,
    link: attachment.url,
    fileName: name,
    discordId: id,
    createdAt,
    uploaderId,
    description: null,
  };
};
