import { ChatInputCommandInteraction } from "discord.js";
import { showAlbumDropdown } from "./showAlbumDropdown";
import { AlbumSelection } from "../data/albumSelection";

export const handleNotSubscribed = async (interaction: ChatInputCommandInteraction) => {
  await showAlbumDropdown(interaction, (albumSelection: AlbumSelection) => {});
};
