import { SlashCommandBuilder } from "discord.js";
module.exports = {
    data: new SlashCommandBuilder()
        .setName("goat")
        .setDescription("Check who the GOAT is"),
    async execute(interaction) {
        await interaction.reply("Lucia Nunez is the goat");
    },
};
//# sourceMappingURL=goat.js.map