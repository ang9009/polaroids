import { CommandData } from "../../../types/commandData";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { IsSubscribedResponse } from "shared/src/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { handleAlbumSelection } from "../helpers/handleAlbumSelection";

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
  let msg: string;

  if (channelSubData.isSubscribed) {
    msg =
      `This channel is currently linked to album **${channelSubData.linkedAlbum!}**. ` +
      "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
    await handleAlbumSelection(msg, true, interaction);
  } else {
    msg = "Select an album to link this channel to.";
    await handleAlbumSelection(msg, false, interaction);
  }
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
