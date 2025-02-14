import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { getChannelSubData } from "../../../services/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { AlbumSelectionType } from "../../settings/data/albumSelectionType";
import { performBackupWithProgress } from "../../settings/helpers/performBackupWithProgress";
import { showAlbumDropdown } from "../../settings/helpers/showAlbumDropdown";
import { createAlbum } from "../services/createAlbum";

/**
 * A command that backs up all the images/videos in the current channel that have not
 * already been archived.
 */
const data = new SlashCommandBuilder()
  .setName("backup")
  .setDescription("Find and upload images in this channel that have not already been archived")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to backup. Leave this empty to backup the current channel"),
  );

/**
 * The execute function for the backup command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const channelOption = interaction.options.getChannel("channel");
  if (channelOption && !(channelOption instanceof TextChannel)) {
    replyWithErrorEmbed(interaction, "This command can only be called in text channels.");
    return;
  }

  const channel = channelOption || (interaction.channel as TextChannel);
  if (!channel) {
    replyWithErrorEmbed(
      interaction,
      "Could not find the channel `backup` was called in. Please try again.",
    );
    return;
  }

  await interaction.deferReply();
  // If the channel is already subscribed to, use the linked album
  const channelSubData = await getChannelSubData(channel.id);
  if (channelSubData.isSubscribed) {
    const { linkedAlbumId, linkedAlbumName } = channelSubData;
    await interaction.editReply(
      `Linked album **${linkedAlbumName}** found for ${channel.toString()}.`,
    );
    await performBackupWithProgress(channel, linkedAlbumId, linkedAlbumName, interaction.user);
    return;
  }

  // Otherwise, ask the user to specify an album
  const msg = "Select an album to upload the contents of this channel to.";
  const dropdownSelectionRes = await showAlbumDropdown(msg, interaction);
  if (dropdownSelectionRes === undefined) {
    return;
  }

  const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
  const { albumName, albumDesc, type } = selectedAlbum;

  let albumId;
  if (type === AlbumSelectionType.CREATE_NEW) {
    try {
      ({ albumId } = await createAlbum(albumName, albumDesc || null));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      const errEmbed = getErrorEmbed(errMsg);
      await dropdownInteraction.reply({ embeds: [errEmbed] });
      return;
    }
  } else {
    albumId = selectedAlbum.albumId;
  }
  await performBackupWithProgress(channel, albumId, albumName, interaction.user);
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
