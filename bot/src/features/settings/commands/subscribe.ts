import { CommandData } from "../../../types/commandData";

import {
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { IsSubscribedResponse } from "shared/src/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { createAlbumAndLinkChannel } from "../api/createAlbumAndLinkChannel";
import { setChannelAlbum } from "../api/setChannelAlbum";
import { subscribeChannelAndSetAlbum } from "../api/subscribeChannelAndSetAlbum";
import { subscribeChannelWithNewAlbum } from "../api/subscribeChannelWithNewAlbum.ts";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";

import { showAlbumDropdown } from "../helpers/showAlbumDropdown";

/**
 * A command used to subscribe polaroids to changes in a channel, and uploads attachments
 * to an album that is specified after this command is invoked. Users can choose to create
 * a new album, or select an existing one to link to the channel this command was called in.
 */
const data = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Ask polaroids to archive any attachments sent in this channel");

/**
 * A helper function that is run once the user has selected/created an album.
 * @param albumData data regarding the album selected/created
 * @param interaction the ongoing interaction
 * @param alreadySubscribed whether the current channel has already been
 *         subscribed to
 * @returns the name of the album, or undefined if the selection is invalid
 */
export const onAlbumSelectionComplete = async (
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
  await interaction.reply(`Successfully linked channel to album **${albumData.albumName}**.`);

  const backupPrompt =
    "It looks like there are unarchived attachments previously sent in this channel. " +
    "Would you like to back them up?";
  await interaction.followUp(backupPrompt);
};

/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const channelSubData: IsSubscribedResponse = await getChannelSubData(interaction.channelId);

  const linkedAlbum = channelSubData.isSubscribed ? channelSubData.linkedAlbum : undefined;

  const isAlreadySubscribedMsg =
    `This channel is currently linked to album **${linkedAlbum}**. ` +
    "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
  const notSubscribedMsg = "Select an album to link this channel to.";
  const msg = channelSubData.isSubscribed ? isAlreadySubscribedMsg : notSubscribedMsg;

  showAlbumDropdown(
    msg,
    interaction,
    (albumData, interaction) => {
      onAlbumSelectionComplete(albumData, interaction, channelSubData.isSubscribed);
    },
    linkedAlbum,
  );
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
