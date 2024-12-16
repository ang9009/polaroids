import { EmbedBuilder, TextChannel, User } from "discord.js";
import { PrimaryColors } from "../../../data/primaryColors";
import { uploadFiles } from "../../event-triggers/api/uploadFiles";
import { FileData } from "../../event-triggers/types/fileData";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { getChannelNonUploadedFiles } from "./getChannelNonUploadedFiles";

/**
 * Backs up the contents of the given channel while keeping the user notified of
 * the progress of the backup via embeds.
 * @param channel the channel
 * @param albumData data regarding the album the files in the channel should be
 *        uploaded to
 * @param requester the name of the user who requested the upload
 */
export const performBackupWithProgress = async (
  channel: TextChannel,
  albumData: AlbumSelectionData,
  requester: User,
) => {
  const { albumName } = albumData;
  const statusEmbed = new EmbedBuilder()
    .setTitle("Channel backup request")
    .setColor(PrimaryColors.PRIMARY_BLUE)
    .addFields([
      { name: "Status", value: "Processing channel history... (this may take a while)" },
      { name: "Album", value: albumName },
      { name: "Requested by", value: requester.username },
    ]);
  const processingMsg = await channel.send({ embeds: [statusEmbed] });

  // Get all the files in the channel that have not been uploaded
  let filesData: FileData[];
  try {
    filesData = await getChannelNonUploadedFiles(channel);
  } catch (err) {
    if (err instanceof Error) {
      statusEmbed
        .spliceFields(0, 1, { name: "Status", value: err.message })
        .setColor(PrimaryColors.FAILURE_RED);
      // Ping the user, and update the status embed
      processingMsg.edit({ content: requester.toString(), embeds: [statusEmbed] });
    }
    return;
  }

  statusEmbed.spliceFields(0, 1, {
    name: "Status",
    value: `${filesData.length} file(s) found. Uploading...`,
  });
  const uploadingMsg = await processingMsg.edit({ embeds: [statusEmbed] });

  // Upload the files
  let uploadedFileCount: number;
  try {
    uploadedFileCount = await uploadFiles(filesData, albumName, false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    statusEmbed
      .spliceFields(0, 1, { name: "Status", value: "Upload failed. Please try again." })
      .setColor(PrimaryColors.FAILURE_RED);
    uploadingMsg.edit({ content: requester.toString(), embeds: [statusEmbed] });
    return;
  }

  let uploadConfirmMsg: string;
  if (uploadedFileCount === 0) {
    uploadConfirmMsg = "All of the attachments sent in this channel have already been archived!";
  } else if (uploadedFileCount < filesData.length) {
    uploadConfirmMsg =
      "It looks like some attachments sent in this channel have already been archived." +
      ` ${uploadedFileCount} attachment(s) were successfully uploaded.`;
  } else {
    uploadConfirmMsg = `Successfully uploaded ${uploadedFileCount} attachment(s).`;
  }
  statusEmbed
    .spliceFields(0, 1, {
      name: "Status",
      value: uploadConfirmMsg,
    })
    .setColor(PrimaryColors.SUCCESS_GREEN);
  // Ping the user
  await uploadingMsg.edit({ content: requester.toString(), embeds: [statusEmbed] });
};