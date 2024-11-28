import { ChatInputCommandInteraction } from "discord.js";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
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

  // ! This should be extracted, or the callback functino should provide the
  // ! interaction too
  await handleAlbumSelection(interaction, msg, async (albumData: AlbumSelectionData) => {
    if (albumData.type === AlbumSelectionType.CREATE_NEW) {
      const { type, albumName, albumDesc } = albumData;

      const albumExists = await checkAlbumExists(albumName);
      if (albumExists) {
        return interaction.reply("An album with this name already exists! Cancelling operation.");
      }
    }
  });

  // createAlbumFromModalInputs(interaction)
};
