import { ChatInputCommandInteraction } from "discord.js";
import { showAlbumDropdown } from "./showAlbumDropdown";

export const handleNotSubscribed = async (interaction: ChatInputCommandInteraction) => {
  await showAlbumDropdown(interaction);
};
