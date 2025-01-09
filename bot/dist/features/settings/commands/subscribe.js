import { SlashCommandBuilder, TextChannel } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { handleAlbumSelection } from "../helpers/handleAlbumSelection";
import { showAlbumDropdown } from "../helpers/showAlbumDropdown";
/**
 * A command used to subscribe polaroids to changes in a channel, and uploads attachments
 * to an album that is specified after this command is invoked. Users can choose to create
 * a new album, or select an existing one to link to the channel this command was called in.
 */
const data = new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription("Ask polaroids to archive any attachments sent in a channel")
    .addChannelOption((option) => option
    .setName("channel")
    .setDescription("The channel to be subscribed to. Leave this empty to subscribe to the current channel"));
/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction) => {
    const channelArg = interaction.options.getChannel("channel");
    if (channelArg && !(channelArg instanceof TextChannel)) {
        replyWithErrorEmbed(interaction, "Only text channels can be subscribed to.");
        return;
    }
    const channel = channelArg || interaction.channel;
    if (!channel) {
        throw Error("Could not find channel");
    }
    await interaction.deferReply();
    const channelSubData = await getChannelSubData(channel.id);
    const linkedAlbum = channelSubData.isSubscribed ? channelSubData.linkedAlbumName : undefined;
    serv;
    const isAlreadySubscribedMsg = `${channel.toString()} is currently linked to album **${linkedAlbum}**. ` +
        "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
    const notSubscribedMsg = `Select an album to link ${channel.toString()} to.`;
    const msg = channelSubData.isSubscribed ? isAlreadySubscribedMsg : notSubscribedMsg;
    const dropdownSelectionRes = await showAlbumDropdown(msg, interaction, linkedAlbum);
    if (dropdownSelectionRes === undefined) {
        return;
    }
    const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
    const { guildId, channelId } = interaction;
    if (!channelId) {
        throw Error("Could not find channel id");
    }
    // Link the channel to the album according to the user's instructions
    try {
        await handleAlbumSelection(selectedAlbum, channelId, guildId, channelSubData.isSubscribed);
    }
    catch (err) {
        let errMsg = "An unknown error occurred. Please try again.";
        if (err instanceof Error) {
            errMsg = err.message;
        }
        const errEmbed = getErrorEmbed(errMsg);
        await dropdownInteraction.reply({ content: "", embeds: [errEmbed] });
        return;
    }
    await dropdownInteraction.reply(`Successfully linked channel to album **${selectedAlbum.albumName}**.`);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=subscribe.js.map