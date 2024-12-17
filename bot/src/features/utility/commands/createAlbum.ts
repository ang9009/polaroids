import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandData } from "../../../types/commandData";

/**
 * Creates a new album with the given name and description.
 */
const data = new SlashCommandBuilder().setName("createalbum").setDescription("Create a new album");

/**
 * The execute function for the createAlbum command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
