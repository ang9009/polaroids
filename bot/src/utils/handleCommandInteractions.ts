import { EmbedBuilder, Interaction } from "discord.js";
import { getErrorEmbed } from "./getErrorEmbed";

/**
 * Handles interactions/commands executed by users.
 * @param interaction the interaction in question
 */
export const handleCommandInteractions = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Try to get the command from the commands collection
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    let errEmbed: EmbedBuilder;
    if (error instanceof Error) {
      errEmbed = getErrorEmbed(`There was an error while executing this command: ${error.message}`);
    } else {
      errEmbed = getErrorEmbed("There was an error while executing this command!");
    }
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        embeds: [errEmbed],
      });
    } else {
      await interaction.reply({
        embeds: [errEmbed],
      });
    }
  }
};
