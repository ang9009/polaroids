import { Attachment, Message } from "discord.js";
import { AttachmentUploadData } from "../@types/attachmentUploadData.js";
import { SupportedContentType } from "../@types/supportedContentType.js";
import formatBytes from "../utils/formatBytes.js";
import getBlobFromUrl from "../utils/getBlobFromUrl.js";
import getContentTypeFromString from "../utils/getContentTypeFromString.js";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    // If the author is a bot (e.g. Polaroids itself)/message has no
    // attachments, do nothing
    if (message.author.bot || message.attachments.size === 0) {
      return;
    }

    const attachments = message.attachments.map((attachment) => attachment);
    const date = new Date(message.createdTimestamp);
    const { unsupportedAttachmentsString, blobs, contentTypes, ids } =
      await processAttachments(attachments);

    if (unsupportedAttachmentsString) {
      // If there are no valid attachments (only unsupported content types), return
      if (blobs.length === 0) {
        message.reply(
          `All of the provided files are of unsupported formats: ${unsupportedAttachmentsString}. Please try again.`
        );
        return;
      } else {
        message.reply(
          `File(s) of unsupported formats found: ${unsupportedAttachmentsString} These will be ignored.`
        );
      }
    }

    const attachmentsUploadData = getAttachmentsUploadData(
      blobs,
      ids,
      date,
      contentTypes
    );
    const totalSizeString = getAttachmentsTotalSizeString(attachments);

    console.log(totalSizeString, attachmentsUploadData);
    message.reply(`Images sent! Size of upload: ${totalSizeString}`);
  },
};

/**
 * Produces a formatted string representation of the total size of the given attachments.
 * @param attachments an array of attachments
 * @returns  a formatted string representation of attachments' total size (e.g. 12MB)
 */
const getAttachmentsTotalSizeString = (attachments: Attachment[]): string => {
  const totalSizeBytes = attachments.reduce(
    (size, curr) => size + curr.size,
    0
  );
  const totalSize = formatBytes(totalSizeBytes);
  return totalSize;
};

/**
 * Converts attachment data into a array of AttachmentUploadData objects. This
 * assumes that blobs[i], ids[i], and contentTypes[i] all correspond to the same file.
 * @param blobs the blobs for each attachment
 * @param ids the ids for each attachment
 * @param date the date at which the attachments were sent
 * @param contentTypes the content types for each attachment
 * @returns a array of the corresponding AttachmentUploadData objects
 */
const getAttachmentsUploadData = (
  blobs: Blob[],
  ids: string[],
  date: Date,
  contentTypes: SupportedContentType[]
): AttachmentUploadData[] => {
  return blobs.map((blob, i) => {
    const id = ids[i];
    const data: AttachmentUploadData = {
      file: blob,
      id: id,
      date: date,
      people: [],
      contentType: contentTypes[i],
    };
    return data;
  });
};

/**
 * Process a array of attachments and returns data about them
 * @param attachments the array of attachments
 * @returns a string that represents a array of attachments that were of
 *      unsupported formats (unsupportedAttachmentsString), a array of blobs (blobs)
 *      and a array of ids (ids) of the files with valid formats, and a array of their
 *      respective content types (contentTypes). Note that blobs[i], ids[i] and
 *      contentTypes[i] all correspond to the same file.
 */
const processAttachments = async (attachments: Attachment[]) => {
  const blobs: Blob[] = [];
  const ids: string[] = [];
  const unsupportedAttachments: string[] = [];
  const contentTypes: SupportedContentType[] = [];

  for (const attachment of attachments) {
    const fileName = attachment.name;
    const typeExtension = attachment.contentType;
    if (!typeExtension) {
      unsupportedAttachments.push(`${fileName} (unknown type)`);
      continue;
    }
    let contentType;
    try {
      contentType = getContentTypeFromString(typeExtension);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // Content type is not recognized
      unsupportedAttachments.push(`${fileName} (${typeExtension})`);
      continue;
    }
    contentTypes.push(contentType);
    ids.push(attachment.id);
    blobs.push(await getBlobFromUrl(attachment.url));
  }

  const unsupportedAttachmentsString = unsupportedAttachments.join(", ");
  return { unsupportedAttachmentsString, blobs, ids, contentTypes };
};
