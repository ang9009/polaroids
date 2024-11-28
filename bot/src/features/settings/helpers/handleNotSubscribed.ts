import { ChatInputCommandInteraction } from "discord.js";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { showAlbumDropdown } from "./showAlbumDropdown";

export const handleNotSubscribed = async (interaction: ChatInputCommandInteraction) => {
  const msg = "Select an album to link to this channel.";
  // await showAlbumDropdown(msg, interaction, (albumSelection: AlbumDropdownSelection) => {
  //   if (albumSelection.type)
  // });
};
