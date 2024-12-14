import { CacheType, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { uploadFiles } from "../../event-triggers/api/uploadFiles";
import { FileData } from "../../event-triggers/types/fileData";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { getChannelNonUploadedFiles } from "./getChannelNonUploadedFiles";

/**
 * Backs up the contents of the channel where the given interaction is taking
 * place in while keeping the user notified of the progress of the backup via embeds.
 * @param interaction the ongoing interaction
 * @param albumData data regarding the album the files in the channel should be
 *        uploaded to
 */
export const performBackupWithProgress = async (
  interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  albumData: AlbumSelectionData,
) => {
  const processingMsg = await interaction.followUp("Processing channel history...");
  const channel = interaction.channel;
  if (!channel) {
    const errEmbed = getErrorEmbed("Could not find this channel. Backup failed.");
    interaction.followUp({ content: "", embeds: [errEmbed] });
    return;
  }

  let filesData: FileData[];
  try {
    filesData = await getChannelNonUploadedFiles(channel);
  } catch (err) {
    if (err instanceof Error) {
      const errEmbed = getErrorEmbed(err.message);
      processingMsg.edit({ content: "", embeds: [errEmbed] });
    }
    return;
  }
  const updateReply = await interaction.followUp(`${filesData.length} file(s) found. Uploading...`);

  let uploadedFileCount: number;
  try {
    uploadedFileCount = await uploadFiles(filesData, albumData.albumName, false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    const errEmbed = getErrorEmbed("Backup failed. Please try again.");
    updateReply.edit({ content: "", embeds: [errEmbed] });
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
  await updateReply.edit({ content: uploadConfirmMsg });
};
