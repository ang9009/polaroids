import {
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { createAlbumAndLinkChannel } from "../api/createAlbumAndLinkChannel";
import { setChannelAlbum } from "../api/setChannelAlbum";
import { subscribeChannelAndSetAlbum } from "../api/subscribeChannelAndSetAlbum";
import { subscribeChannelWithNewAlbum } from "../api/subscribeChannelWithNewAlbum.ts";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { startAlbumDropdownInteraction } from "./startAlbumDropdownInteraction";

/**
 * Handles album selection by showing an album dropdown menu, then saving the
 * user's desired settings according to their choices.
 * @param msg the message shown above the dropdown menu
 * @param alreadySubscribed whether the channel is already subscribed to
 * @param interaction the ongoing interaction
 * @param linkedAlbum the album that the channel is already subscribed to
 */
export const handleAlbumSelection = async (
  msg: string,
  alreadySubscribed: boolean,
  interaction: ChatInputCommandInteraction,
  linkedAlbum?: string,
) => {
  // Start dropdown interaction
  await startAlbumDropdownInteraction(
    interaction,
    msg,
    (albumData, interaction) => onSelectionComplete(albumData, interaction, alreadySubscribed),
    linkedAlbum,
  );
};

/**
 * A helper function that is run once the user has selected/created an album.
 * @param albumData data regarding the album selected/created
 * @param interaction the ongoing interaction
 * @param alreadySubscribed whether the current channel has already been
 *         subscribed to
 */
const onSelectionComplete = async (
  albumData: AlbumSelectionData,
  interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  alreadySubscribed: boolean,
) => {
  const { channelId, guildId } = interaction;
  if (!guildId || !channelId) {
    throw Error("guildId or channelId is undefined for some reason");
  }

  // If user wants to create new album
  if (albumData.type === AlbumSelectionType.CREATE_NEW) {
    const { albumName: newAlbumName, albumDesc: newAlbumDesc } = albumData;
    const albumExists = await checkAlbumExists(newAlbumName);
    if (albumExists) {
      interaction.reply("An album with this name already exists! Please try again.");
      return;
    }

    // If channel is already subscribed to, create album and link the existing
    // channel to it
    if (alreadySubscribed) {
      await createAlbumAndLinkChannel(newAlbumName, newAlbumDesc, channelId, guildId);
    } else {
      // Otherwise, create a new album and save the channel
      await subscribeChannelWithNewAlbum(newAlbumName, newAlbumDesc, channelId, guildId);
    }
  } else {
    // If user wants to use existing album
    const { albumName: newAlbumName } = albumData;

    // If channel is already subscribed to, change its linked album
    if (alreadySubscribed) {
      await setChannelAlbum(newAlbumName, channelId, guildId);
    } else {
      // Otherwise, save the channel and set its linked album
      await subscribeChannelAndSetAlbum(newAlbumName, channelId, guildId);
    }
  }

  interaction.reply(`Successfully linked channel to new album **${albumData.albumName}**.`);
};
