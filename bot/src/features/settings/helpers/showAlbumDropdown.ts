import {
  ActionRowBuilder,
  CacheType,
  ChatInputCommandInteraction,
  ComponentType,
  ModalBuilder,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { Album } from "../../../../../db-api/node_modules/.prisma/client";
import { getAlbums } from "../api/getAlbumNames";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
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
export const showAlbumDropdown = async (
  msg: string,
  interaction: ChatInputCommandInteraction,
  onSelectionComplete: (
    albumData: AlbumSelectionData,
    interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  ) => void,
  linkedAlbum?: string,
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
    if (album.name === linkedAlbum) {
      continue;
    }
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
      onAlbumSelect(
        { type: AlbumSelectionType.CREATE_NEW },
        selectInteraction,
        onSelectionComplete,
      );
    } else {
      onAlbumSelect(
        { albumName: selection, type: AlbumSelectionType.EXISTING },
        selectInteraction,
        onSelectionComplete,
      );
    }
    interaction.deleteReply();
  });
};

/**
 * A helper function that is run once an album option has been selected.
 * @param selection the selection that was made
 * @param interaction the ongoing interaction
 * @param onSelectionComplete a callback function that is called when the
 *        function finishes processing the user's selection
 */
const onAlbumSelect = async (
  selection: AlbumDropdownSelection,
  interaction: StringSelectMenuInteraction<CacheType>,
  onSelectionComplete: (
    albumData: AlbumSelectionData,
    interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  ) => void,
) => {
  // If the user wants to create a new album
  if (selection.type === AlbumSelectionType.CREATE_NEW) {
    // Show a modal for the user to enter the details of the album
    const title = "Create & Link Album";
    const modal: ModalBuilder = getCreateAlbumModal(title);
    await interaction.showModal(modal);

    // eslint-disable-next-line jsdoc/require-jsdoc
    const filter = (interaction: ModalSubmitInteraction) =>
      interaction.customId === "createAlbumModal";

    interaction.awaitModalSubmit({ filter, time: 60_000 }).then((interaction) => {
      const albumName: string = interaction.fields.getTextInputValue("albumNameField");
      const albumDesc: string = interaction.fields.getTextInputValue("albumDescField");
      const albumData: AlbumSelectionData = {
        type: AlbumSelectionType.CREATE_NEW,
        albumName,
        albumDesc,
      };
      onSelectionComplete(albumData, interaction);
    });
  } else {
    // If the user wants to use an existing album
    const albumData: AlbumSelectionData = {
      type: AlbumSelectionType.EXISTING,
      albumName: selection.albumName,
    };
    onSelectionComplete(albumData, interaction);
  }
};
