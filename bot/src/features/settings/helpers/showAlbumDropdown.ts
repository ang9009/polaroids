import {
  ActionRowBuilder,
  CacheType,
  ChatInputCommandInteraction,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { Album } from "../../../../../db-api/node_modules/.prisma/client";
import { getAlbums } from "../api/getAlbumNames";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { AlbumSelectionType } from "../data/albumSelectionType";

/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album. Calls a given callback function and deletes
 * the interaction reply when the user makes their selection.
 * @param msg the message shown above the dropdown
 * @param interaction the interaction with the user
 * @param onAlbumSelect a callback function that is called when the user makes a
 *        selection. This function provides the selected album (selection) and the new
 *        interaction object (interaction) to the caller.
 */
export const showAlbumDropdown = async (
  msg: string,
  interaction: ChatInputCommandInteraction,
  onAlbumSelect: (
    selection: AlbumDropdownSelection,
    interaction: StringSelectMenuInteraction<CacheType>,
  ) => void,
) => {
  const albums: Album[] = await getAlbums();

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
      .setLabel(album.name)
      .setDescription(album.description)
      .setValue(album.name);
    menuAlbumOptions.push(option);
  }

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId("starter")
    .setPlaceholder("Select an album...")
    .addOptions(menuAlbumOptions);
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown);

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
      onAlbumSelect({ type: AlbumSelectionType.CREATE_NEW }, selectInteraction);
    } else {
      onAlbumSelect({ albumName: selection, type: AlbumSelectionType.EXISTING }, selectInteraction);
    }
    interaction.deleteReply();
  });
};
