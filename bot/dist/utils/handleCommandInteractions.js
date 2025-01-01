import { getErrorEmbed } from "./getErrorEmbed";
/**
 * Handles interactions/commands executed by users.
 * @param interaction the interaction in question
 */
export const handleCommandInteractions = async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    // Try to get the command from the commands collection
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (err) {
        console.log(err);
        const errEmbed = getErrorEmbed("An unknown error occurred.");
        await interaction.reply({ embeds: [errEmbed] });
    }
};
//# sourceMappingURL=handleCommandInteractions.js.map