import { Attachment, EmbedBuilder, Message, OmitPartialGroupDMChannel } from "discord.js";
import { uploadFilesToPS } from "../api/photostation/file/uploadFilesToPS.js";
import { getContentTypeFromMimeType } from "../api/photostation/utils/getContentTypeFromMimeType.js";
import { AttachmentUploadData } from "../types/data/attachmentUploadData.js";
import { PhotoUploadData } from "../types/data/photoUploadData.js";
import { SupportedContentType } from "../types/data/supportedContentType.js";
import { SupportedPhotoType } from "../types/data/supportedPhotoType.js";
import { VideoUploadData } from "../types/data/videoUploadData.js";
import { formatBytes } from "../utils/formatBytes.js";
import { getBlobFromUrl } from "../utils/getBlobFromUrl.js";

/**
 * The event that is fired when a user sends a message in a watched channel,
 * which is determined during the setup phase. The upload sequence has 3 primary
 * stages: validating the attachments for unsupported types, converting the attachments
 * into AttachmentUploadData objects, and uploading the data to PhotoStation.
 */
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

    // Send the initial "validating" message
    const validatingMsg = getCurrentStatusMsg(
      requesterName,
      totalSizeString,
      UploadStatus.VALIDATING,
    );
    const initialMsgRef = await userMsg.reply({ embeds: [validatingMsg] });

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

    // Send "converting" status message
    const convertingStatusMsg = getCurrentStatusMsg(
      requesterName,
      totalSizeString,
      UploadStatus.CONVERTING,
    );
    initialMsgRef.edit({ embeds: [convertingStatusMsg] });

    // Convert all of the files into AttachmentUploadData objects
    const allFilesData: AttachmentUploadData[] = getAttachmentsUploadData(
      blobs!,
      ids!,
      contentTypes!,
    );

    // Update the loading status to 60%, and change the status to uploading
    const uploadingMsg = getCurrentStatusMsg(
      requesterName,
      totalSizeString,
      UploadStatus.UPLOADING,
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
    const successMsg = getCurrentStatusMsg(requesterName, totalSizeString, UploadStatus.SUCCESS);
    initialMsgRef.edit({ embeds: [successMsg] });
  },
};

/**
 * Represents the status of the upload.
 */
enum UploadStatus {
  VALIDATING = "Validating attachments...",
  CONVERTING = "Converting attachments...",
  UPLOADING = "Uploading attachments...",
  SUCCESS = "Upload complete",
  FAILURE = "Upload failed",
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
    .setColor(getEmbedColor(UploadStatus.FAILURE));
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
  switch (status) {
    case UploadStatus.FAILURE:
      return 0xfc100d; // Red
    case UploadStatus.SUCCESS:
      return 0x4bb543; // Green
    default:
      return 0x58acec; // Blue
  }
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
  const uploadFailureMsgEmbed = getCurrentStatusMsg(
    requesterName,
    totalSizeString,
    UploadStatus.FAILURE,
  );
  initialMsgRef.edit({ embeds: [uploadFailureMsgEmbed] });
  const errorEmbed = getErrorMsgEmbed(`An error occurred while processing attachments: ${errMsg}`);
  userMsg.reply({ embeds: [errorEmbed] });
};

/**
 * Creates an embed that represents the current status of the upload.
 * @param requesterName the user who requested the upload
 * @param totalSizeString a string representation of the total size of the upload
 * @param uploadStatus the current status fo the upload
 * @returns an EmbedBuilder with the given information
 */
const getCurrentStatusMsg = (
  requesterName: string,
  totalSizeString: string,
  uploadStatus: UploadStatus,
): EmbedBuilder => {
  switch (uploadStatus) {
    case UploadStatus.VALIDATING:
      // Displayed when the bot is validating the attachments for unsupported types
      return getUploadStatusEmbed(UploadStatus.VALIDATING, requesterName, totalSizeString, 0);
    case UploadStatus.CONVERTING:
      // Displayed when the bot is uploading the attachments to FileStation
      return getUploadStatusEmbed(UploadStatus.CONVERTING, requesterName, totalSizeString, 0.4);
    case UploadStatus.UPLOADING:
      // Displayed when the bot is uploading the attachments to FileStation
      return getUploadStatusEmbed(UploadStatus.UPLOADING, requesterName, totalSizeString, 0.6);
    case UploadStatus.FAILURE:
      // Displayed when something causes the upload to fail (e.g. invalid attachment types)
      return getUploadStatusEmbed(UploadStatus.FAILURE, requesterName, totalSizeString, 0);
    case UploadStatus.SUCCESS:
      // Displayed when the bot has successfully updated the data to PhotoStation
      return getUploadStatusEmbed(UploadStatus.SUCCESS, requesterName, totalSizeString, 1);
  }
};
