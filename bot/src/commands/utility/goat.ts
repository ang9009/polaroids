import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("goat")
  .setDescription("Check who the GOAT is");

/**
 * Informs the user of who the GOAT is.
 * @param interaction the interaction object associated with the interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Lucia Nunez is the goat");
}
