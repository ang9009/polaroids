import { Attachment, Message } from "discord.js";
import {
  AttachmentUploadData,
  PhotoUploadData,
  VideoUploadData,
} from "../@types/data/attachmentUploadData.js";
import { SupportedContentType } from "../@types/data/supportedContentType.js";
import { SupportedPhotoType } from "../@types/data/supportedPhotoType.js";
import { uploadFilesToPS } from "../api/photostation/file/uploadFilesToPS.js";
import { getContentTypeFromMimeType } from "../api/photostation/utils/getContentTypeFromMimeType.js";
import { formatBytes } from "../utils/formatBytes.js";
import { getFileFromUrl } from "../utils/getFileFromUrl.js";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    if (message.author.bot || message.attachments.size === 0) {
      return;
    }

    const loadingMsgRef = await message.reply("Processing attachments...");
    const attachments = message.attachments.map((attachment) => attachment);

    let files, contentTypes, ids, unsupportedAttachmentsString;
    try {
      ({ unsupportedAttachmentsString, files, contentTypes, ids } =
        await processAndValidateAttachments(attachments));
    } catch (err) {
      console.error("Error occurred while processing attachments:", err);
      loadingMsgRef.edit(`An error occurred while processing attachments: ${err}`);
      return;
    }

    // If there are unsupported attachments, handle them
    if (unsupportedAttachmentsString) {
      // If all attachments are unsupported, return immediately
      if (files.length === 0) {
        loadingMsgRef.edit(
          `All of the provided files are of unsupported formats: ${unsupportedAttachmentsString}. Please try again.`,
        );
        return;
      } else {
        loadingMsgRef.edit(
          `File(s) of unsupported formats found: ${unsupportedAttachmentsString}. These will be ignored.`,
        );
      }
    }

    const allFilesData: AttachmentUploadData[] = getAttachmentsUploadData(files, ids, contentTypes);
    const totalSizeString = getAttachmentsTotalSizeString(files);

    console.log(totalSizeString, allFilesData, files[0].name);

    try {
      await uploadFilesToPS(allFilesData);
    } catch (err) {
      console.error("Error occurred while uploading attachments:", err);
      loadingMsgRef.edit(`An error occurred while uploading attachments: ${err}`);
      return;
    }
    message.reply(`Attachments sent! Size of upload: ${totalSizeString}`);
  },
};

/**
 * Produces a formatted string representation of the total size of the given files.
 * @param files an array of files
 * @returns a formatted string representation of the files' total size (e.g. 12MB)
 */
const getAttachmentsTotalSizeString = (files: File[]): string => {
  const totalSizeBytes = files.reduce((size, file) => size + file.size, 0);
  const totalSize = formatBytes(totalSizeBytes);
  return totalSize;
};

/**
 * Converts attachment data into a array of AttachmentUploadData objects. This
 * assumes that files[i], ids[i], and contentTypes[i] all correspond to the same file.
 * @param files the files for each attachment
 * @param ids the ids for each attachment
 * @param contentTypes the content types for each attachment
 * @returns a array of the corresponding AttachmentUploadData objects
 */
const getAttachmentsUploadData = (
  files: File[],
  ids: string[],
  contentTypes: SupportedContentType[],
): AttachmentUploadData[] => {
  return files.map((file, i) => {
    const id = ids[i];
    const contentType = contentTypes[i];

    let data;
    if (contentType instanceof SupportedPhotoType) {
      data = new PhotoUploadData(file, id, [], contentTypes[i]);
    } else {
      data = new VideoUploadData(file, id, [], contentTypes[i]);
    }
    return data;
  });
};

/**
 * Processes an array of attachments, filtering out invalid files and extracting data from valid ones.
 * @param attachments - The array of attachments to process.
 * @returns An object containing:
 *      - unsupportedAttachmentsString: A string listing unsupported attachments.
 *      - files: An array of File objects for valid attachments. The names each
 *        file matches the attachment name.
 *      - ids: An array of IDs for valid attachments.
 *      - contentTypes: An array of content types for valid attachments.
 *      (Note: files[i], ids[i], and contentTypes[i] correspond to the same file.)
 * @throws an error if a file extension is not recognized, or if there isn't a
 *     SupportedContentType associated with the MIME type found (see getContentTypeFromString).
 */
const processAndValidateAttachments = async (attachments: Attachment[]) => {
  const files: File[] = [];
  const ids: string[] = [];
  const unsupportedAttachments: string[] = [];
  const contentTypes: SupportedContentType[] = [];

  for (const attachment of attachments) {
    const attachmentName = attachment.name;
    const mimeType = attachment.contentType;
    if (!mimeType) {
      unsupportedAttachments.push(`${attachmentName} (unknown type)`);
      continue;
    }

    const contentType = getContentTypeFromMimeType(mimeType);
    // Content type is not recognized
    if (!contentType) {
      unsupportedAttachments.push(`${attachmentName} (${mimeType})`);
      continue;
    }
    contentTypes.push(contentType);
    ids.push(attachment.id);
    // The name of the file should be the attachment's id and its file extension
    const fileName = attachment.id + contentType.extension;
    const file = await getFileFromUrl(attachment.url, fileName);
    files.push(file);
  }

  const unsupportedAttachmentsString = unsupportedAttachments.join(", ");
  return { unsupportedAttachmentsString, files, ids, contentTypes };
};
