import { ChatInputCommandInteraction } from "discord.js";

/**
 *
 * @param interaction
 */
export const handleNotSubscribed = async (interaction: ChatInputCommandInteraction) => {
  const msg = "Select an album to link to this channel.";
  // await showAlbumDropdown(msg, interaction, (albumSelection: AlbumDropdownSelection) => {
  //   if (albumSelection.type)
  // });
};
