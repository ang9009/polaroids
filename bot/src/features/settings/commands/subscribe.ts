import { CommandData } from "../../../types/commandData";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { IsSubscribedResponse } from "shared/src/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../api/getChannelSubData";
import { handleAlreadySubscribed } from "../helpers/handleAlreadySubscribed";
import { handleNotSubscribed } from "../helpers/handleNotSubscribed";

/**
 * The slash command object for "subscribe", which is exported below. Users can
 * choose to create a new album, or select an existing one to link to the
 * channel this command was called in.
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
  const channelSubData: IsSubscribedResponse = await getChannelSubData(interaction.channelId);

  if (channelSubData.isSubscribed) {
    await handleAlreadySubscribed(interaction, channelSubData.linkedAlbum!);
  } else {
    await handleNotSubscribed(interaction);
  }
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
