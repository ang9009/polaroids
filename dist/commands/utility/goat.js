import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
    .setName("goat")
    .setDescription("Check who the GOAT is");
export async function execute(interaction) {
    await interaction.reply("孩子們我回來了");
}
//# sourceMappingURL=goat.js.map