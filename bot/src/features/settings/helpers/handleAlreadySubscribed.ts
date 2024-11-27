import { ChatInputCommandInteraction } from "discord.js";
import { handleAlbumSelection } from "./handleAlbumSelection";

/**
 * Handles the /subscribe command interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 * @param albumName the album that the channel is linked to
 */
export const handleAlreadySubscribed = async (
  interaction: ChatInputCommandInteraction,
  albumName: string,
) => {
  const msg: string =
    "polaroids is already subscribed to this channel. " +
    `This channel is currently linked to album **${albumName}**. ` +
    "Select an album from the dropdown below to change this.";

  await handleAlbumSelection(interaction, msg);
};
