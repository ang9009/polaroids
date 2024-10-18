import { Attachment, Message } from "discord.js";
import { AttachmentUploadData } from "../@types/data/attachmentUploadData.js";
import { SupportedContentType } from "../@types/data/supportedContentType.js";
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

    const attachmentsUploadData = getAttachmentsUploadData(files, ids, contentTypes);
    const totalSizeString = getAttachmentsTotalSizeString(attachments);

    console.log(totalSizeString, attachmentsUploadData);
    message.reply(`Attachments sent! Size of upload: ${totalSizeString}`);
  },
};

/**
 * Produces a formatted string representation of the total size of the given attachments.
 * @param attachments an array of attachments
 * @returns a formatted string representation of the attachments' total size (e.g. 12MB)
 */
const getAttachmentsTotalSizeString = (attachments: Attachment[]): string => {
  const totalSizeBytes = attachments.reduce((size, curr) => size + curr.size, 0);
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

    const data: AttachmentUploadData = {
      file: file,
      id: id,
      people: [],
      contentType: contentTypes[i],
    };
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
    const typeExtension = attachment.contentType;
    if (!typeExtension) {
      unsupportedAttachments.push(`${attachmentName} (unknown type)`);
      continue;
    }

    const contentType = getContentTypeFromMimeType(typeExtension);
    // Content type is not recognized
    if (!contentType) {
      unsupportedAttachments.push(`${attachmentName} (${typeExtension})`);
      continue;
    }
    contentTypes.push(contentType);
    ids.push(attachment.id);
    const fileName = attachment.name + contentType.extension;
    const file = await getFileFromUrl(attachment.url, fileName);
    files.push(file);
  }

  const unsupportedAttachmentsString = unsupportedAttachments.join(", ");
  return { unsupportedAttachmentsString, files, ids, contentTypes };
};
