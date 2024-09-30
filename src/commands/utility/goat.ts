import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("goat")
  .setDescription("Check who the GOAT is");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Lucia Nunez is the goat");
}
