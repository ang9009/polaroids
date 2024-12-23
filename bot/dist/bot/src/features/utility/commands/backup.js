import { SlashCommandBuilder, TextChannel } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { AlbumSelectionType } from "../../settings/data/albumSelectionType";
import { performBackupWithProgress } from "../../settings/helpers/performBackupWithProgress";
import { showAlbumDropdown } from "../../settings/helpers/showAlbumDropdown";
import { createAlbum } from "../api/createAlbum";
/**
 * A command that backs up all the images/videos in the current channel that have not
 * already been archived.
 */
const data = new SlashCommandBuilder()
    .setName("backup")
    .setDescription("Find and upload images in this channel that have not already been archived")
    .addChannelOption((option) => option
    .setName("channel")
    .setDescription("The channel to backup. Leave this empty to backup the current channel"));
/**
 * The execute function for the backup command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const channelOption = interaction.options.getChannel("channel");
    if (channelOption && !(channelOption instanceof TextChannel)) {
        replyWithErrorEmbed(interaction, "This command can only be called in text channels.");
        return;
    }
    const channel = channelOption || interaction.channel;
    if (!channel) {
        replyWithErrorEmbed(interaction, "Could not find the channel `backup` was called in. Please try again.");
        return;
    }
    // If the channel is already subscribed to, use the linked album
    const channelSubData = await getChannelSubData(channel.id);
    if (channelSubData.isSubscribed) {
        const linkedAlbum = channelSubData.linkedAlbum;
        await interaction.reply(`Linked album **${linkedAlbum}** found for ${channel.toString()}.`);
        await performBackupWithProgress(channel, linkedAlbum, interaction.user);
        return;
    }
    // Otherwise, ask the user to specify an album
    const msg = "Select an album to upload the contents of this channel to.";
    const dropdownSelectionRes = await showAlbumDropdown(msg, interaction);
    if (dropdownSelectionRes === undefined) {
        return;
    }
    const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
    const { albumName, albumDesc, type } = selectedAlbum;
    await dropdownInteraction.deferUpdate();
    if (type === AlbumSelectionType.CREATE_NEW) {
        try {
            await createAlbum(albumName, albumDesc || null);
        }
        catch (err) {
            const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            const errEmbed = getErrorEmbed(errMsg);
            await dropdownInteraction.reply({ embeds: [errEmbed] });
            return;
        }
    }
    await performBackupWithProgress(channel, albumName, interaction.user);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=backup.js.map