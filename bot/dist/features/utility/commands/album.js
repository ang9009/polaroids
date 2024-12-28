import { SlashCommandBuilder, SlashCommandSubcommandBuilder, StringSelectMenuInteraction, } from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { AlbumSelectionType } from "../../settings/data/albumSelectionType";
import { getAlbumModal } from "../../settings/helpers/getAlbumModal";
import { getAlbumModalInputs } from "../../settings/helpers/getAlbumModalInputs";
import { createAlbum } from "../api/createAlbum";
import { deleteAlbum } from "../api/deleteAlbum";
import { editAlbum } from "../api/editAlbum";
import { showAlbumDropdown } from "./../../settings/helpers/showAlbumDropdown";
var SubCommand;
(function (SubCommand) {
    SubCommand["CREATE"] = "create";
    SubCommand["EDIT_INFO"] = "editinfo";
    SubCommand["DELETE"] = "delete";
})(SubCommand || (SubCommand = {}));
const createAlbumSubCmd = new SlashCommandSubcommandBuilder()
    .setName(SubCommand.CREATE)
    .setDescription("Create a new album");
const editAlbumSubCmd = new SlashCommandSubcommandBuilder()
    .setName(SubCommand.EDIT_INFO)
    .setDescription("Edit an existing album's name/description");
const deleteAlbumSubCmd = new SlashCommandSubcommandBuilder()
    .setName(SubCommand.DELETE)
    .setDescription("Delete an empty album");
/**
 * Creates a new album with the given name and description.
 */
const data = new SlashCommandBuilder()
    .setName("album")
    .setDescription("Create, edit (an album's name/desc), or delete an album")
    .addSubcommand(createAlbumSubCmd)
    .addSubcommand(editAlbumSubCmd)
    .addSubcommand(deleteAlbumSubCmd);
/**
 * The execute function for the createAlbum command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const subCmd = interaction.options.getSubcommand();
    switch (subCmd) {
        case SubCommand.CREATE: {
            await handleCreateAlbumInteraction(interaction);
            break;
        }
        case SubCommand.EDIT_INFO: {
            await handleEditAlbumInteraction(interaction);
            break;
        }
        case SubCommand.DELETE: {
            await handleDeleteAlbumInteraction(interaction);
            break;
        }
        default:
            throw Error("Unrecognized subcommand");
    }
};
/**
 * Handles the delete album interaction. This presents the user with a dropdown
 * to select the album to be deleted, then deletes the specified album.
 * @param interaction the ongoing interaction
 */
const handleDeleteAlbumInteraction = async (interaction) => {
    await interaction.deferReply();
    const dropdownSelectionRes = await showAlbumDropdown("Please select the album you would like to delete. Albums with files cannot be deleted.", interaction, undefined, true);
    if (dropdownSelectionRes === undefined) {
        return;
    }
    const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
    const { type } = selectedAlbum;
    if (type === AlbumSelectionType.CREATE_NEW) {
        throw Error("Create new should not be an option when deleting an album");
    }
    const { albumName, albumId } = selectedAlbum;
    try {
        await deleteAlbum(albumId);
    }
    catch (err) {
        const errMsg = err instanceof Error ? err.message : "An unknown error occurred. Please try again.";
        const errEmbed = getErrorEmbed(errMsg);
        await dropdownInteraction.reply({ embeds: [errEmbed] });
        return;
    }
    await dropdownInteraction.reply(`Successfully deleted album ${albumName}.`);
};
/**
 * Handles the "edit album" subcommand interaction. This provides the user with
 * a dropdown of albums to select from, then opens a modal where the user can
 * provide the new name and/or description of the selected album.
 * @param interaction the ongoing interaction
 */
const handleEditAlbumInteraction = async (interaction) => {
    await interaction.deferReply();
    const dropdownSelectionRes = await showAlbumDropdown("Please select the album you would like to edit.", interaction, undefined, true);
    if (dropdownSelectionRes === undefined) {
        return;
    }
    const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
    const { albumName: originalAlbumName, albumDesc } = selectedAlbum;
    const nameInputId = "albumNameInput";
    const descInputId = "albumDescInput";
    const modal = getAlbumModal("Edit album info", nameInputId, descInputId, originalAlbumName, albumDesc);
    if (!(dropdownInteraction instanceof StringSelectMenuInteraction)) {
        throw Error("Unexpected interaction type");
    }
    await dropdownInteraction.showModal(modal);
    const { albumName: newAlbumName, description: newAlbumDesc, modalInteraction, } = await getAlbumModalInputs(dropdownInteraction, nameInputId, descInputId);
    try {
        await editAlbum(originalAlbumName, newAlbumName, newAlbumDesc);
    }
    catch (err) {
        const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        const errEmbed = getErrorEmbed(errMsg);
        await modalInteraction.reply({ embeds: [errEmbed] });
        return;
    }
    const editedAlbumName = originalAlbumName === newAlbumName ? originalAlbumName : newAlbumName;
    await modalInteraction.reply(`Successfully edited album **${editedAlbumName}**.`);
};
/**
 * Uses the arguments from the "create album" subcommand interaction to create
 * the album and inform the user of the result.
 * @param interaction the ongoing interaction
 */
const handleCreateAlbumInteraction = async (interaction) => {
    const nameInputId = "albumNameInput";
    const descInputId = "albumDescInput";
    const modal = getAlbumModal("Create album", nameInputId, descInputId);
    await interaction.showModal(modal);
    const { albumName: albumName, description: albumDesc, modalInteraction, } = await getAlbumModalInputs(interaction, nameInputId, descInputId);
    try {
        await createAlbum(albumName, albumDesc);
    }
    catch (err) {
        let errMsg;
        if (err instanceof Error) {
            errMsg = err.message;
        }
        else {
            errMsg = "Something went wrong. Please try again.";
        }
        const errEmbed = getErrorEmbed(errMsg);
        await modalInteraction.reply({ embeds: [errEmbed] });
        return;
    }
    await modalInteraction.reply(`Successfully created album **${albumName}**.`);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=album.js.map