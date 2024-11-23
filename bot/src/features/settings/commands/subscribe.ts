import { CommandData } from "../../../types/commandData";

import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { channelIsSubscribed } from "../api/channelIsSubscribed";
import { handleSubscribedInteraction } from "./helpers/subscribe/handleSubscribedInteraction";

/**
 * The slash command object for "subscribe", which is exported below. This
 * command walks the user through subscribing polaroids to updates in a channel.
 * Users can choose to create a new album, or select an existing one to link to
 * the channel this command was called in.
 */
const data = new SlashCommandBuilder().setName("subscribe").setDescription(
  `Ask polaroids to watch this channel for media and automatically
     upload it to a specified album`,
);

/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const isSubscribed = await channelIsSubscribed(interaction.channelId);
  if (isSubscribed) {
    await handleSubscribedInteraction(interaction);
  } else {
    interaction.reply("Not subscribed to this channel: " + interaction.channelId);
  }
};

export const handleAlbumSelected = (interaction: StringSelectMenuInteraction<CacheType>) => {};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
