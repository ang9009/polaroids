import { SlashCommandBuilder } from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { uploadAttachmentsWithProgress } from "../../event-triggers/helpers/uploadFilesWithProgress";
import { AlbumSelectionType } from "../../settings/data/albumSelectionType";
import { showAlbumDropdown } from "../../settings/helpers/showAlbumDropdown";
import { createAlbum } from "../api/createAlbum";
/**
 * Uploads files attached to a specified message (using its message id).
 */
const data = new SlashCommandBuilder()
    .setName("upload")
    .setDescription("Upload files attached to a specified message in the current channel")
    .addStringOption((messageIdOption) => messageIdOption.setName("message_id").setDescription("The message's id").setRequired(true));
/**
 * The execute function for the upload command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const messageId = interaction.options.getString("message_id", true);
    const channel = interaction.channel;
    if (!channel) {
        throw Error("Could not find channel");
    }
    await interaction.deferReply();
    let msg;
    try {
        msg = await channel.messages.fetch(messageId);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (err) {
        const errEmbed = getErrorEmbed(`Could not find the specified message with id "${messageId}". Please try again.`);
        await interaction.editReply({ embeds: [errEmbed] });
        return;
    }
    const { attachments } = msg;
    if (attachments.size === 0) {
        const errEmbed = getErrorEmbed(`The specified message with id "${messageId}" has no attachments. Please try again.`);
        await interaction.editReply({ embeds: [errEmbed] });
        return;
    }
    const dropdownSelectionRes = await showAlbumDropdown("Please select the album that the attachments will be uploaded to.", interaction, undefined);
    if (dropdownSelectionRes === undefined) {
        return;
    }
    const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
    const { albumName, albumDesc, type } = selectedAlbum;
    await dropdownInteraction.deferUpdate();
    let albumId;
    if (type === AlbumSelectionType.CREATE_NEW) {
        try {
            const albumRes = await createAlbum(albumName, albumDesc || null);
            ({ albumId } = albumRes);
        }
        catch (err) {
            if (err instanceof Error) {
                const errEmbed = getErrorEmbed(err.message);
                await interaction.editReply({ embeds: [errEmbed] });
            }
            return;
        }
    }
    else {
        albumId = selectedAlbum.albumId;
    }
    await uploadAttachmentsWithProgress(msg, albumId, albumName);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=upload.js.map