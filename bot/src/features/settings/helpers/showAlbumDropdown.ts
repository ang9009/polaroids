import {
  ActionRowBuilder,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { Album } from "../../../../../db-api/node_modules/.prisma/client";
import { getAlbums } from "../api/getAlbumNames";
import { AlbumDropdownInteraction } from "../data/albumDropdownInteraction";
import { AlbumSelection } from "../data/albumSelection";
import { AlbumSelectionType } from "./../data/albumSelectionType";

/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album. Calls a given callback function and deletes
 * the interaction reply when the user makes their selection.
 * @param message the message shown above the dropdown
 * @param interaction the interaction with the user
 * @param selection a callback function that is called when the user makes a selection
 */
export const showAlbumDropdown = async (
  messsage: string,
  interaction: AlbumDropdownInteraction,
  callback: (selection: AlbumSelection) => void,
) => {
  let albums: Album[];
  albums = await getAlbums();

  const menuAlbumOptions: StringSelectMenuOptionBuilder[] = [];

  // At the top of the menu, add an option for creating a new menu
  const createNewOptionValue = Math.random().toString(); // Create a random value to avoid album name conflicts
  const createNewOption = new StringSelectMenuOptionBuilder()
    .setLabel("Add album")
    .setDescription("Set up a new album")
    .setValue(createNewOptionValue)
    .setEmoji("🆕");
  menuAlbumOptions.push(createNewOption);

  // Add the rest of the albums as options
  for (const album of albums) {
    const option = new StringSelectMenuOptionBuilder()
      .setLabel(album.albumName)
      .setDescription(album.description)
      .setValue(album.albumName);
    menuAlbumOptions.push(option);
  }

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId("starter")
    .setPlaceholder("Select an album...")
    .addOptions(menuAlbumOptions);
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown);

  const msg =
    "Select an album to link with this channel. Photos sent here will be uploaded to the selected album.";
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
      callback({ type: AlbumSelectionType.CREATE_NEW });
    } else {
      callback({ albumName: selection, type: AlbumSelectionType.EXISTING });
    }
    interaction.deleteReply();
  });
};
