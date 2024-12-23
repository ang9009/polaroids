import { Interaction } from "discord.js";

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

  await command.execute(interaction);
};
