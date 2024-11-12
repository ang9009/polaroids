import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("setup")
  .setDescription("Set up polaroids")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

/**
 * Informs the user of who the GOAT is.
 * @param interaction the interaction object associated with the interaction
 */
export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("Lucia Nunez is the goat");
}
