import axios, { isAxiosError } from "axios";
import { SlashCommandBuilder } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
const data = new SlashCommandBuilder()
    .setName("unsubscribe")
    .setDescription("Make polaroids stop watching for attachments in this channel");
/**
 * The execute function for the "unsubscribe" command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const channelId = interaction.channelId;
    try {
        const { isSubscribed } = await getChannelSubData(channelId);
        if (!isSubscribed) {
            const errEmbed = getErrorEmbed("polaroids is not subscribed to this channel.");
            interaction.reply({ embeds: [errEmbed] });
            return;
        }
    }
    catch (err) {
        const msg = `Something went wrong while attempting to get channel subscription data: ${err}`;
        console.error(msg);
        return;
    }
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/subscribed-channels/${channelId}`;
    try {
        await axios.delete(url);
    }
    catch (err) {
        if (isAxiosError(err)) {
            console.error("Failed to unsubscribe: " + err.message);
        }
        const errEmbed = getErrorEmbed("Failed to unsubscribe from this channel. Please try again.");
        interaction.reply({ embeds: [errEmbed] });
        return;
    }
    interaction.reply("Successfully unsubscribed from this channel.");
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=unsubscribe.js.map