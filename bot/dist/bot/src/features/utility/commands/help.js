import { EmbedBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "discord.js";
import { PrimaryColors } from "../../../data/primaryColors";
/**
 * A command that lists all available commands.
 */
const data = new SlashCommandBuilder().setName("help").setDescription("List available commands");
/**
 * The execute function for the help command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const settingCmds = "- `/subscribe <channel>`: ask polaroids to upload any attachments sent in a channel, or link a channel to a different album\n" +
        "- `/unsubscribe <channel>`: unsubscribe polaroids from changes in a channel\n";
    const utilCmds = "- `/album create | edit | delete`: create, edit, or delete an album\n" +
        "- `/upload <message_id>`: upload files attached to a specified message in the current channel\n" +
        "- `/backup <channel>`: find and upload all unarchived attachments in a channel\n";
    const infoCmds = "- `/list albums | channels`: list all existing albums/subscribed channels in this guild and their associated albums\n" +
        "- `/website`: get a link to the polaroids site\n" +
        "- `/help`: list available commands";
    const helpEmbed = new EmbedBuilder()
        .setTitle("polaroids commands")
        .setFields([
        { name: "Settings", value: settingCmds },
        { name: "Utility", value: utilCmds },
        { name: "Info", value: infoCmds },
    ])
        .setFooter({
        text: "📸 polaroids v1.0 | by dalfie",
    })
        .setColor(PrimaryColors.PRIMARY_WHITE);
    interaction.reply({ embeds: [helpEmbed] });
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=help.js.map