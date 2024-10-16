import { Attachment, Message } from "discord.js";
import { AttachmentUploadData } from "../@types/data/attachmentUploadData.js";
import MimeType from "../@types/data/mimeType.js";
import {
  SupportedContentType,
  SupportedPhotoType,
  SupportedVideoType,
} from "../@types/data/supportedContentType.js";
import formatBytes from "../utils/formatBytes.js";
import getBlobFromUrl from "../utils/getBlobFromUrl.js";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    if (message.author.bot || message.attachments.size === 0) {
      return;
    }

    const attachments = message.attachments.map((attachment) => attachment);
    const date = new Date(message.createdTimestamp);

    let blobs, contentTypes, ids, unsupportedAttachmentsString;
    try {
      ({ unsupportedAttachmentsString, blobs, contentTypes, ids } =
        await processAndValidateAttachments(attachments));
    } catch (err) {
      console.error("Error processing attachments:", err);
      message.reply(`An error occurred while processing attachments: ${err}`);
      return;
    }

    // If there are unsupported attachments, handle them
    if (unsupportedAttachmentsString) {
      // If all attachments are unsupported, return immediately
      if (blobs.length === 0) {
        message.reply(
          `All of the provided files are of unsupported formats: ${unsupportedAttachmentsString}. Please try again.`,
        );
        return;
      } else {
        message.reply(
          `File(s) of unsupported formats found: ${unsupportedAttachmentsString}. These will be ignored.`,
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
 * @throws an error if a file extension is not recognized, or if there isn't a
 *     SupportedContentType associated with the MIME type found (see getContentTypeFromString).
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

    const contentType = getContentTypeFromMimeType(typeExtension);
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
 * Factory method that returns the associated SupportedContentType enum given a file extension,
 * or null if it doesn't exist.
 * @param mimeType the file extension in question
 * @returns the associated SupportContentType enum
 */
const getContentTypeFromMimeType = (mimeType: string): SupportedContentType | undefined => {
  let supportedContentType: SupportedContentType | undefined;

  switch (mimeType) {
    case MimeType.GIF:
      supportedContentType = SupportedPhotoType.GIF;
      break;
    case MimeType.JPG:
      supportedContentType = SupportedPhotoType.JPG;
      break;
    case MimeType.PNG:
      supportedContentType = SupportedPhotoType.PNG;
      break;
    case MimeType.TIFF:
      supportedContentType = SupportedPhotoType.TIFF;
      break;
    case MimeType.MOV:
      supportedContentType = SupportedVideoType.MOV;
      break;
    case MimeType.MP4:
      supportedContentType = SupportedVideoType.MP4;
      break;
    case MimeType.MPEG:
      supportedContentType = SupportedVideoType.MPEG;
      break;
    default:
      supportedContentType = undefined;
  }

  return supportedContentType;
};
