import { Attachment, Message } from "discord.js";
import { AttachmentUploadData } from "../@types/data/attachmentUploadData.js";
import { MimeType, SupportedContentType } from "../@types/data/supportedContentType.js";
import formatBytes from "../utils/formatBytes.js";
import getBlobFromUrl from "../utils/getBlobFromUrl.js";

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
      await processAndValidateAttachments(attachments);

    if (unsupportedAttachmentsString) {
      // If there are no valid attachments (only unsupported content types), return
      if (blobs.length === 0) {
        message.reply(
          `All of the provided files are of unsupported formats: ${unsupportedAttachmentsString}. Please try again.`,
        );
        return;
      } else {
        message.reply(
          `File(s) of unsupported formats found: ${unsupportedAttachmentsString} These will be ignored.`,
        );
      }
    }

    const attachmentsUploadData = getAttachmentsUploadData(blobs, ids, date, contentTypes);
    const totalSizeString = getAttachmentsTotalSizeString(attachments);

    console.log(totalSizeString, attachmentsUploadData);
    message.reply(`Images sent! Size of upload: ${totalSizeString}`);
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
  contentTypes: SupportedContentType[],
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
 * Processes an array of attachments, filtering out invalid files and extracting data from valid ones.
 * @param attachments - The array of attachments to process.
 * @returns An object containing:
 *      - unsupportedAttachmentsString: A string listing unsupported attachments.
 *      - blobs: An array of Blob objects for valid attachments.
 *      - ids: An array of IDs for valid attachments.
 *      - contentTypes: An array of content types for valid attachments.
 *      (Note: blobs[i], ids[i], and contentTypes[i] correspond to the same file.)
 */
const processAndValidateAttachments = async (attachments: Attachment[]) => {
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
    const contentType = getContentTypeFromString(typeExtension);
    // Content type is not recognized
    if (!contentType) {
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

/**
 * Returns the associated SupportedContentType enum given a file extension, or
 * null if it doesn't exist.
 * @param fileExtension the file extension in question
 * @returns the associated SupportContentType enum
 * @throws an error if the file extension is not recognized, or if there isn't a
 *     SupportedContentType associated with the MIME type found.
 */
const getContentTypeFromString = (fileExtension: string): SupportedContentType | undefined => {
  const contentTypeExtensions: string[] = Object.values(MimeType);
  const mimeType = contentTypeExtensions.find((currFileType) => currFileType === fileExtension) as
    | MimeType
    | undefined;

  // Return the MimeType, even if it is undefined
  if (!mimeType) {
    return mimeType;
  }
  const supportedType = SupportedContentType.getSupportedContentType(mimeType);
  if (!supportedType) {
    throw new Error(`Missing supported type for MIME type: ${mimeType}`);
  }
  return supportedType;
};

export default getContentTypeFromString;
