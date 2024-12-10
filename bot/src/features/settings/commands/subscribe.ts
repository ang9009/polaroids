import { CommandData } from "../../../types/commandData";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { IsSubscribedResponse } from "shared/src/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { onAlbumSelectionComplete } from "../helpers/onAlbumSelectionComplete";
import { showAlbumDropdown } from "../helpers/showAlbumDropdown";

/**
 * A command used to subscribe polaroids to changes in a channel, and uploads attachments
 * to an album that is specified after this command is invoked. Users can choose to create
 * a new album, or select an existing one to link to the channel this command was called in.
 */
const data = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription(
    "Ask polaroids to watch this channel for media" +
      " and automatically upload it to a specified album",
  );

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
