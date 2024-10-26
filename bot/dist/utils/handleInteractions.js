/**
 * Handles interactions/commands executed by users.
 * @param interaction the interaction in question
 */
export const handleInteractions = async (interaction) => {
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
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
        else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                ephemeral: true,
            });
        }
    }
};
//# sourceMappingURL=handleInteractions.js.map