import { ChatInputCommandInteraction } from "discord.js";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { showAlbumDropdown } from "./showAlbumDropdown";

export const handleNotSubscribed = async (interaction: ChatInputCommandInteraction) => {
  await showAlbumDropdown(interaction, (albumSelection: AlbumDropdownSelection) => {});
};
