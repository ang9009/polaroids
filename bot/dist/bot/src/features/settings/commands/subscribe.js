import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, TextChannel, } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { handleAlbumSelection } from "../helpers/handleAlbumSelection";
import { performBackupWithProgress } from "../helpers/performBackupWithProgress";
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
 * A helper function that is run once the user has selected/created an album.
 * @param subChannel the channel to be subscribed to. If this is undefined, the
 *                   channel that the interaction is taking place is in will be used
 * @param albumData data regarding the album selected/created
 * @param interaction the ongoing interaction
 * @param alreadySubscribed whether the current channel has already been
 *         subscribed to
 * @returns the name of the album, or undefined if the selection is invalid
 */
export const onAlbumSelectionComplete = async (subChannel, albumData, interaction, alreadySubscribed) => {
    const { guildId, channelId } = interaction;
    if (!channelId) {
        throw Error("Could not find channel id");
    }
    const channel = subChannel || interaction.guild?.channels.cache.get(channelId);
    // Link the channel to the album according to the user's instructions
    try {
        await handleAlbumSelection(albumData, channelId, guildId, alreadySubscribed);
    }
    catch (err) {
        if (err instanceof Error) {
            const errEmbed = getErrorEmbed(err.message);
            interaction.reply({ content: "", embeds: [errEmbed] });
            return;
        }
    }
    await interaction.reply(`Successfully linked channel to album **${albumData.albumName}**.`);
    // Ask user if they would like to back up previously uploaded attachments
    const confirmBtnId = "confirm";
    const cancelBtnId = "cancel";
    const confirm = new ButtonBuilder()
        .setCustomId(confirmBtnId)
        .setLabel("Confirm")
        .setStyle(ButtonStyle.Primary);
    const cancel = new ButtonBuilder()
        .setCustomId(cancelBtnId)
        .setLabel("Cancel")
        .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(confirm, cancel);
    const backupOptionsFollowUp = await channel.send({
        content: "Would you like me to look through this channel's history " +
            `and backup any unarchived files to its linked album **${albumData.albumName}**?`,
        components: [row],
    });
    try {
        const confirmation = await backupOptionsFollowUp.awaitMessageComponent({
            // eslint-disable-next-line jsdoc/require-jsdoc
            filter: (i) => i.user.id === interaction.user.id,
            time: 60_000,
        });
        if (confirmation.customId === confirmBtnId) {
            await backupOptionsFollowUp.delete();
            await performBackupWithProgress(channel, albumData.albumName, interaction.user);
        }
        else if (confirmation.customId === cancelBtnId) {
            await backupOptionsFollowUp.edit({
                content: "Backup operation cancelled. " +
                    "You can find and upload unarchived files using `/backup` anytime.",
                components: [],
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (e) {
        await backupOptionsFollowUp.edit({
            content: "No response was received." +
                "You can find and upload unarchived files using `/backup` anytime.",
            components: [],
        });
    }
};
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
    const channelSubData = await getChannelSubData(channel.id);
    const linkedAlbum = channelSubData.isSubscribed ? channelSubData.linkedAlbum : undefined;
    const isAlreadySubscribedMsg = `${channel.toString()} is currently linked to album **${linkedAlbum}**. ` +
        "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
    const notSubscribedMsg = `Select an album to link ${channel.toString()} to.`;
    const msg = channelSubData.isSubscribed ? isAlreadySubscribedMsg : notSubscribedMsg;
    // Rest of logic is in onAlbumSelectionComplete
    showAlbumDropdown(msg, interaction, (albumData, interaction) => {
        onAlbumSelectionComplete(channel, albumData, interaction, channelSubData.isSubscribed);
    }, linkedAlbum);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=subscribe.js.map