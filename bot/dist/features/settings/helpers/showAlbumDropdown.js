import { ActionRowBuilder, ComponentType, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, } from "discord.js";
import { getAlbums } from "../api/getAlbumNames";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { getAlbumModal } from "./getAlbumModal";
import { getAlbumModalInputs } from "./getAlbumModalInputs";
/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album. Calls a given callback function and deletes
 * the interaction reply when the user makes their selection.
 * @param msg the message shown above the dropdown
 * @param interaction the interaction with the user
 * @param onSelectionComplete a callback function that is called once the user
 *        has selected an existing album/finished entering details for a new
 *        one. This callback function must update the interaction somehow.
 * @param linkedAlbum the album that this channel is already linked to. If this
 *        is not undefined, the given album will be omitted from the dropdown.
 * @param hideCreateAlbumOption whether the create album option should be hidden
 */
export const showAlbumDropdown = async (msg, interaction, onSelectionComplete, linkedAlbum, hideCreateAlbumOption) => {
    const albums = await getAlbums();
    // At the top of the menu, add an option for creating a new menu
    const createNewOptionId = Math.random().toString(); // Create a random value to avoid album name conflicts
    const menuAlbumOptions = getAlbumDropdownOptions(createNewOptionId, albums, linkedAlbum, hideCreateAlbumOption);
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
        if (selection === createNewOptionId) {
            await onAlbumSelect({ type: AlbumSelectionType.CREATE_NEW }, selectInteraction, onSelectionComplete);
        }
        else {
            await onAlbumSelect({
                albumName: selection,
                albumDesc: albums.find((album) => album.name === selection)?.description || undefined,
                type: AlbumSelectionType.EXISTING,
            }, selectInteraction, onSelectionComplete);
        }
        // Disable the dropdown
        await interaction.editReply({
            content: `The album **${selection}** was selected.`,
            components: [],
        });
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
        const modal = getAlbumModal(title, "albumNameField", "albumDescField");
        await interaction.showModal(modal);
        const { name: albumName, description: albumDesc } = await getAlbumModalInputs(interaction, "albumNameField", "albumDescField");
        const albumData = {
            type: AlbumSelectionType.CREATE_NEW,
            albumName,
            albumDesc: albumDesc || undefined,
        };
        onSelectionComplete(albumData, interaction);
        return albumName;
    }
    else {
        // If the user wants to use an existing album
        const { albumName, albumDesc } = selection;
        const albumData = {
            type: AlbumSelectionType.EXISTING,
            albumName: albumName,
            albumDesc: albumDesc,
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
 * @param hideCreateAlbumOption whether the create album option should be included
 * @returns the list of options
 */
function getAlbumDropdownOptions(createNewOptionId, albums, linkedAlbum, hideCreateAlbumOption) {
    const menuAlbumOptions = [];
    if (hideCreateAlbumOption === undefined ||
        (hideCreateAlbumOption !== undefined && !hideCreateAlbumOption)) {
        const createNewOption = new StringSelectMenuOptionBuilder()
            .setLabel("Add album")
            .setDescription("Set up a new album")
            .setValue(createNewOptionId)
            .setEmoji("🆕");
        menuAlbumOptions.push(createNewOption);
    }
    // Add the rest of the albums as options
    for (const album of albums) {
        if (album.name === linkedAlbum) {
            continue;
        }
        const option = new StringSelectMenuOptionBuilder().setLabel(album.name).setValue(album.name);
        if (album.description) {
            option.setDescription(album.description);
        }
        menuAlbumOptions.push(option);
    }
    return menuAlbumOptions;
}
//# sourceMappingURL=showAlbumDropdown.js.map