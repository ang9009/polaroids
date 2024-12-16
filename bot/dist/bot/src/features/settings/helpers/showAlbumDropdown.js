import { ActionRowBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, } from "discord.js";
import { getAlbums } from "../api/getAlbumNames";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { getCreateAlbumModal } from "./getCreateAlbumModal";
/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album. Calls a given callback function and deletes
 * the interaction reply when the user makes their selection.
 * @param msg the message shown above the dropdown
 * @param interaction the interaction with the user
 * @param onSelectionComplete a callback function that is called once the user
 *        has selected an existing album/finished entering details for a new one
 * @param linkedAlbum the album that this channel is already linked to. If this
 *        is not undefined, the given album will be omitted from the dropdown.
 */
export const showAlbumDropdown = async (msg, interaction, onSelectionComplete, linkedAlbum) => {
    const albums = await getAlbums();
    // At the top of the menu, add an option for creating a new menu
    const createNewOptionValue = Math.random().toString(); // Create a random value to avoid album name conflicts
    const menuAlbumOptions = getAlbumDropdownOptions(createNewOptionValue, albums, linkedAlbum);
    const dropdown = new StringSelectMenuBuilder()
        .setCustomId("starter")
        .setPlaceholder("Select an album...")
        .addOptions(menuAlbumOptions);
    const row = new ActionRowBuilder().addComponents(dropdown);
    const response = await interaction.reply({
        content: msg,
        components: [row],
    });
    // Handle the album selection
    const collector = response.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 3600000,
    });
    collector.on("collect", async (selectInteraction) => {
        const selection = selectInteraction.values[0];
        if (selection === createNewOptionValue) {
            await onAlbumSelect({ type: AlbumSelectionType.CREATE_NEW }, selectInteraction, onSelectionComplete);
        }
        else {
            await onAlbumSelect({ albumName: selection, type: AlbumSelectionType.EXISTING }, selectInteraction, onSelectionComplete);
        }
        interaction.deleteReply();
    });
};
/**
 * A helper function that is run once an album option has been selected. The
 * user can either choose to select an existing album, or create a new one.
 * @param selection the selection that was made
 * @param interaction the ongoing interaction
 * @param onSelectionComplete a callback function that is called when the
 *        function finishes processing the user's selection
 * @returns the name of the album that was selected/created
 */
const onAlbumSelect = async (selection, interaction, onSelectionComplete) => {
    // If the user wants to create a new album
    if (selection.type === AlbumSelectionType.CREATE_NEW) {
        // Show a modal for the user to enter the details of the album
        const title = "Create & Link Album";
        const modal = getCreateAlbumModal(title);
        await interaction.showModal(modal);
        // eslint-disable-next-line jsdoc/require-jsdoc
        const filter = (interaction) => interaction.customId === "createAlbumModal";
        const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 60_000 });
        const albumName = modalInteraction.fields.getTextInputValue("albumNameField");
        const albumDesc = modalInteraction.fields.getTextInputValue("albumDescField");
        const albumData = {
            type: AlbumSelectionType.CREATE_NEW,
            albumName,
            albumDesc,
        };
        onSelectionComplete(albumData, modalInteraction);
        return albumName;
    }
    else {
        // If the user wants to use an existing album
        const albumName = selection.albumName;
        const albumData = {
            type: AlbumSelectionType.EXISTING,
            albumName: albumName,
        };
        onSelectionComplete(albumData, interaction);
        return albumName;
    }
};
/**
 * Constructs a list of options for the album dropdown.
 * @param createNewOptionId the id for the "create new" option
 * @param albums the list of albums
 * @param linkedAlbum the linked album
 * @returns the list of options
 */
function getAlbumDropdownOptions(createNewOptionId, albums, linkedAlbum) {
    const menuAlbumOptions = [];
    const createNewOption = new StringSelectMenuOptionBuilder()
        .setLabel("Add album")
        .setDescription("Set up a new album")
        .setValue(createNewOptionId)
        .setEmoji("🆕");
    menuAlbumOptions.push(createNewOption);
    // Add the rest of the albums as options
    for (const album of albums) {
        if (album.name === linkedAlbum) {
            continue;
        }
        const option = new StringSelectMenuOptionBuilder()
            .setLabel(album.name)
            .setDescription(album.description)
            .setValue(album.name);
        menuAlbumOptions.push(option);
    }
    return menuAlbumOptions;
}
//# sourceMappingURL=showAlbumDropdown.js.map