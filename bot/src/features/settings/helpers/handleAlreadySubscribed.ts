import { ChatInputCommandInteraction } from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { changeChannelAlbum } from "../api/changeChannelAlbum";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { createAlbumAndLinkChannel } from "../api/createAlbumAndLinkChannel";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { handleAlbumSelection } from "./handleAlbumSelection";

/**
 * Handles the /subscribe command interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 * @param currAlbumName the album that the channel is already linked to
 */
export const handleAlreadySubscribed = async (
  interaction: ChatInputCommandInteraction,
  currAlbumName: string,
) => {
  const msg: string =
    "polaroids is already subscribed to this channel. " +
    `This channel is currently linked to album **${currAlbumName}**. ` +
    "Select an album from the dropdown below to change this.";

  await handleAlbumSelection(
    interaction,
    msg,
    async (albumData: AlbumSelectionData, interaction) => {
      const { channelId, guildId } = interaction;
      if (!guildId || !channelId) {
        throw Error("guildId or channelId is undefined for some reason");
      }

      if (albumData.type === AlbumSelectionType.CREATE_NEW) {
        const { albumName: newAlbumName, albumDesc: newAlbumDesc } = albumData;
        const albumExists = await checkAlbumExists(newAlbumName);
        if (albumExists) {
          return interaction.reply("An album with this name already exists! Cancelling operation.");
        }

        const res = await createAlbumAndLinkChannel(newAlbumName, newAlbumDesc, channelId, guildId);
        if (!res.success) {
          const errEmbed = getErrorEmbed(res.error);
          return interaction.reply({ embeds: [errEmbed] });
        }
      } else {
        await changeChannelAlbum(albumData.albumName, channelId, guildId);
      }

      interaction.reply(`Successfully linked channel to new album **${albumData.albumName}**.`);
    },
  );
};
