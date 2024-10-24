import { Attachment, EmbedBuilder, Message, OmitPartialGroupDMChannel } from "discord.js";
import { AttachmentUploadData } from "../@types/data/attachmentUploadData.js";
import { PhotoUploadData } from "../@types/data/photoUploadData.js";
import { SupportedContentType } from "../@types/data/supportedContentType.js";
import { SupportedPhotoType } from "../@types/data/supportedPhotoType.js";
import { uploadFilesToPS } from "../api/photostation/file/uploadFilesToPS.js";
import { getContentTypeFromMimeType } from "../api/photostation/utils/getContentTypeFromMimeType.js";
import { formatBytes } from "../utils/formatBytes.js";
import { getBlobFromUrl } from "../utils/getBlobFromUrl.js";
import { VideoUploadData } from "./../@types/data/videoUploadData";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(userMsg: Message) {
    if (userMsg.author.bot || userMsg.attachments.size === 0) {
      return;
    }

    // Get all the attachments, their size, and the requester's name
    const attachments = userMsg.attachments.map((attachment) => attachment);
    const requesterName = userMsg.author.username;
    const totalSizeString = getAttachmentsTotalSizeString(attachments);

    // Send the initial "processing" message
    const processingMsg = getProcessingStatusMsg(requesterName, totalSizeString);
    const initialMsgRef = await userMsg.reply({ embeds: [processingMsg] });

    // The embed that the original embed will be changed to if an error occurs
    let blobs, contentTypes, ids, invalidFilesMsg;
    try {
      ({ invalidFilesMsg, blobs, contentTypes, ids } =
        await processAndValidateAttachments(attachments));
    } catch (err) {
      // Edit the original embed, and reply to the user with an error message
      if (err instanceof Error) {
        handleUploadError(requesterName, totalSizeString, initialMsgRef, err.message, userMsg);
        return;
      }
    }

    // If there are unsupported attachments, handle them
    if (invalidFilesMsg) {
      // If all attachments are unsupported, return immediately
      if (blobs!.length === 0) {
        const errMsg = "All of the given attachments are not supported. Please try again.";
        handleUploadError(requesterName, totalSizeString, initialMsgRef, errMsg, userMsg);
        return;
      } else {
        // If only some of the attachments are unsupported, just add a warning
        const warning = `Files of unsupported formats found: ${invalidFilesMsg}. These will be ignored.`;
        const warningEmbed = getWarningMsgEmbed(warning);
        userMsg.reply({ embeds: [warningEmbed] });
      }
    }

    // Update the loading progress to 40%, add warning if necessary
    const midwayStatusMsg = getMidwayStatusMsg(requesterName, totalSizeString);
    initialMsgRef.edit({ embeds: [midwayStatusMsg] });

    // Convert all of the files into AttachmentUploadData objects
    const allFilesData: AttachmentUploadData[] = getAttachmentsUploadData(
      blobs!,
      ids!,
      contentTypes!,
    );

    // Update the loading status to 60%, and change the status to uploading
    const uploadingMsg = getUploadStatusEmbed(
      UploadStatus.Uploading,
      requesterName,
      totalSizeString,
      0.6,
    );
    initialMsgRef.edit({ embeds: [uploadingMsg] });

    try {
      await uploadFilesToPS(allFilesData);
    } catch (err) {
      const errMsg = `An error occurred while uploading attachments: ${err}`;
      handleUploadError(requesterName, totalSizeString, initialMsgRef, errMsg, userMsg);
      return;
    }
    // Update loading status to 100% (complete)
    const successMsg = getSuccessStatusMsg(requesterName, totalSizeString);
    initialMsgRef.edit({ embeds: [successMsg] });
  },
};

/**
 * Represents the status of the upload.
 */
enum UploadStatus {
  Processing = "Processing attachments...",
  Uploading = "Uploading attachments...",
  Success = "Upload complete",
  Failure = "Upload failed",
}

/**
 * Returns a yellow warning embed with the given message.
 * @param warningMsg the warning message on the embed
 * @returns an EmbedBuilder with the given warning message
 */
const getWarningMsgEmbed = (warningMsg: string): EmbedBuilder => {
  const warningYellow = 0xffe900;
  const embed = new EmbedBuilder()
    .setTitle("Warning")
    .setDescription(warningMsg)
    .setColor(warningYellow);
  return embed;
};

/**
 * Returns an EmbedBuilder object that represents an error message.
 * @param errMsg the error message to be displayed
 * @returns an EmbedBuilder with the error message
 */
const getErrorMsgEmbed = (errMsg: string): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle("Upload failed")
    .setDescription(errMsg)
    .setColor(getEmbedColor(UploadStatus.Failure));
  return embed;
};

/**
 * Returns an EmbedBuilder object that contains information on the upload's
 * current status and other data.
 * @param status the status of the upload
 * @param requesterName the username of the user who requested the upload
 * @param uploadSize a string representation of the upload size (e.g. 21MB)
 * @param uploadProgress the progress of the upload represented as a decimal
 *                       between 0 and 1
 * @returns an EmbedBuilder containing all of the given information
 */
const getUploadStatusEmbed = (
  status: UploadStatus,
  requesterName: string,
  uploadSize: string,
  uploadProgress: number,
): EmbedBuilder => {
  if (uploadProgress > 1 || uploadProgress < 0 || status == null) {
    throw Error("Invalid argument(s): status cannot be null and 0 < uploadProgress < 1");
  }

  const loadingBarLength = 20;
  const loadingBarFilledChar = "🟦";
  const loadingBarEmptyChar = "⬜";
  const filledSection = loadingBarFilledChar.repeat(Math.round(loadingBarLength * uploadProgress));
  const loadingBar = filledSection.padEnd(
    // The filled character is length 2 for some reason, so we need to add extra
    // empty characters
    loadingBarLength + filledSection.length / 2,
    loadingBarEmptyChar,
  );
  const loadedPercentage = `${Math.round(uploadProgress * 100)}%`;
  const embedColor = getEmbedColor(status);
  const fields = [
    {
      name: "Status",
      value: status,
      inline: true,
    },
    {
      name: "Upload size",
      value: uploadSize,
      inline: true,
    },
    {
      name: "Requested by",
      value: requesterName,
      inline: true,
    },
  ];

  // The spaces around the description are intentional. Do not remove them,
  // otherwise the carriage returns won't work
  const embed = new EmbedBuilder()
    .setTitle("Upload Request")
    .setDescription(`‎\n${loadingBar}\n(${loadedPercentage})\n‎`)
    .setColor(embedColor)
    .setFields(fields);

  return embed;
};

/**
 * Returns the appropriate color given the current upload status.
 * @param status the current upload status
 * @returns a hexadecimal number representing the associated color
 */
const getEmbedColor = (status: UploadStatus): number => {
  // Red
  if (status == UploadStatus.Failure) {
    return 0xfc100d;
  }

  // Blue
  return 0x58acec;
};

/**
 * Produces a formatted string representation of the total size of the given files.
 * @param attachments the attachments in question
 * @returns a formatted string representation of the files' total size (e.g. 12MB)
 */
const getAttachmentsTotalSizeString = (attachments: Attachment[]): string => {
  const totalSizeBytes = attachments.reduce((size, file) => size + file.size, 0);
  const totalSizeString = formatBytes(totalSizeBytes);
  return totalSizeString;
};

/**
 * Converts attachment data into a array of AttachmentUploadData objects. This
 * assumes that blobs[i], ids[i], and contentTypes[i] all correspond to the same file.
 * @param blobs the blobs corresponding to each attachment
 * @param ids the ids for each attachment
 * @param contentTypes the content types for each attachment
 * @returns a array of the corresponding AttachmentUploadData objects
 */
const getAttachmentsUploadData = (
  blobs: Blob[],
  ids: string[],
  contentTypes: SupportedContentType[],
): AttachmentUploadData[] => {
  return blobs.map((blob, i) => {
    const id = ids[i];
    const contentType = contentTypes[i];

    let data;
    if (contentType instanceof SupportedPhotoType) {
      data = new PhotoUploadData(blob, id, [], contentTypes[i]);
    } else {
      data = new VideoUploadData(blob, id, [], contentTypes[i]);
    }
    return data;
  });
};

/**
 * Processes an array of attachments, filtering out invalid attachments (of
 * unsupported types) and extracting data from valid ones
 * @param attachments - The array of attachments to process.
 * @returns An object containing:
 *      - invalidFilesMsg: A string listing unsupported attachments, each separated
 *        by commas (e.g. video1.m4v, image2.HEIC...).
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
    const file = await getBlobFromUrl(attachment.url);
    blobs.push(file);
  }

  const invalidFilesMsg = unsupportedAttachments.join(", ");
  return { invalidFilesMsg, blobs, ids, contentTypes };
};

/**
 * Returns the "processing" message, sent when the bot is initially processing the data.
 * @param requesterName the name of the user who requested the upload
 * @param totalSizeString a string representation of the total size
 * @returns an EmbedBuilder with the given information and the upload status (0)
 */
const getProcessingStatusMsg = (requesterName: string, totalSizeString: string): EmbedBuilder => {
  const processingMsgEmbed = getUploadStatusEmbed(
    UploadStatus.Processing,
    requesterName,
    totalSizeString,
    0,
  );
  return processingMsgEmbed;
};

/**
 * Returns an embed representing when the upload has progressed to 40%.
 * @param requesterName the name of the user who requested the upload
 * @param totalSizeString a string representation of the total size
 * @returns a midway status embed with the given information
 */
const getMidwayStatusMsg = (requesterName: string, totalSizeString: string): EmbedBuilder => {
  return getUploadStatusEmbed(UploadStatus.Processing, requesterName, totalSizeString, 0.4);
};

/**
 * Creates an embed representing the successful status of an upload.
 * @param requesterName the name of the user who requested the upload
 * @param totalSizeString a string representation of the total size
 * @returns a success status embed with the given information
 */
const getSuccessStatusMsg = (requesterName: string, totalSizeString: string) => {
  return getUploadStatusEmbed(UploadStatus.Success, requesterName, totalSizeString, 1);
};

/**
 * Updates the original status embed, and replies to the user with a new message.
 * @param requesterName the name of the requester (to be used in the upload
 *                      failure status embed)
 * @param totalSizeString a string representation of the total size (to be used in the upload
 *                      failure status embed)
 * @param initialMsgRef a reference to the original status embed, the "processing"
 *                      embed
 * @param errMsg the error message to be displayed in the new message reply
 * @param userMsg the original message sent by the user that triggered the bot
 */
const handleUploadError = (
  requesterName: string,
  totalSizeString: string,
  initialMsgRef: OmitPartialGroupDMChannel<Message<boolean>>,
  errMsg: string,
  userMsg: Message<boolean>,
) => {
  const uploadFailureMsgEmbed = getUploadFailureStatusMsg(requesterName, totalSizeString);
  initialMsgRef.edit({ embeds: [uploadFailureMsgEmbed] });
  const errorEmbed = getErrorMsgEmbed(`An error occurred while processing attachments: ${errMsg}`);
  userMsg.reply({ embeds: [errorEmbed] });
};

/**
 * Returns the "upload failure" status embed, displayed when something causes
 * the upload to fail (e.g. invalid attachment types).
 * @param requesterName the name of the requester
 * @param totalSizeString a string representation of the upload size (e.g. 21MB)\
 * @returns an EmbedBuilder object with the above information
 */
function getUploadFailureStatusMsg(requesterName: string, totalSizeString: string): EmbedBuilder {
  return getUploadStatusEmbed(UploadStatus.Failure, requesterName, totalSizeString, 0);
}
