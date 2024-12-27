import { EmbedBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "discord.js";
import { websiteLink } from "../../../data/constants";
import { PrimaryColors } from "../../../data/primaryColors";
/**
 * Displays a link of the polaroids site.
 */
const data = new SlashCommandBuilder()
    .setName("website")
    .setDescription("Get a link to the website");
/**
 * The execute command for the website command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const websiteEmbed = new EmbedBuilder()
        .setDescription(`[Click here](${websiteLink}) to navigate to the site.`)
        .setColor(PrimaryColors.PRIMARY_WHITE);
    await interaction.reply({ embeds: [websiteEmbed] });
};
const cmdData = {
    data,
    execute,
};
export default cmdData;
//# sourceMappingURL=website.js.map