import { ChatInputCommandInteraction } from "discord.js";
import { handleAlbumSelection } from "./handleAlbumCreation";

/**
 * Handles the /subscribe command interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 * @param albumName the album that the channel is linked to
 */
export const handleAlreadySubscribed = async (
  interaction: ChatInputCommandInteraction,
  albumName: string,
) => {
  const linkedAlbumName = "";
  await handleAlbumSelection(interaction, "This channel is already linked to album");
};
