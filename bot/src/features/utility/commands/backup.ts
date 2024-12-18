import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { editMsgWithErrorEmbed } from "../../../utils/editMsgWithErrorEmbed";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { checkAlbumExists } from "../../settings/api/checkAlbumExists";
import { AlbumSelectionType } from "../../settings/data/albumSelectionType";
import { performBackupWithProgress } from "../../settings/helpers/performBackupWithProgress";
import { showAlbumDropdown } from "../../settings/helpers/showAlbumDropdown";
import { createAlbum } from "../api/createAlbum";

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

  // If the channel is already subscribed to, use the linked album
  const channelSubData = await getChannelSubData(channel.id);
  if (channelSubData.isSubscribed) {
    const linkedAlbum = channelSubData.linkedAlbum;
    await interaction.reply(`Linked album **${linkedAlbum}** found for ${channel.toString()}.`);
    await performBackupWithProgress(channel, linkedAlbum, interaction.user);
    return;
  }

  // Otherwise, ask the user to specify an album
  const msg = "Select an album to upload the contents of this channel to.";
  showAlbumDropdown(msg, interaction, async (albumData, interaction) => {
    const { albumName, type } = albumData;
    const albumExists = await checkAlbumExists(albumName);
    if (albumExists) {
      const msg = `An album with the name "${albumName}" already exists. Please try again.`;
      const errorEmbed = getErrorEmbed(msg);
      return interaction.reply({ embeds: [errorEmbed] });
    }

    const selectionConfirmReply = await interaction.reply(`Selected album: **${albumName}**`);
    if (type === AlbumSelectionType.CREATE_NEW) {
      try {
        await createAlbum(albumName, albumData.albumDesc || null);
      } catch (err) {
        if (err instanceof Error) {
          await editMsgWithErrorEmbed(selectionConfirmReply, err.message);
          return;
        }
        await editMsgWithErrorEmbed(
          selectionConfirmReply,
          "Something went wrong. Please try again.",
        );
        return;
      }
    }

    await performBackupWithProgress(channel, albumName, interaction.user);
  });
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
