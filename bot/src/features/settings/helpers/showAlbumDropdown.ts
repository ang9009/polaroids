import { Album } from "backend/node_modules/.prisma/client";
import {
  ActionRowBuilder,
  CacheType,
  ChatInputCommandInteraction,
  Interaction,
  InteractionReplyOptions,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { AlbumSelectionData } from "../data/albumSelectionData";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { getAlbums } from "../services/getAlbums";
import { getAlbumModal } from "./getAlbumModal";
import { getAlbumModalInputs } from "./getAlbumModalInputs";

type AlbumDropdownSelectionResult = {
  selectedAlbum: AlbumSelectionData;
  dropdownInteraction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>;
};

/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album. Calls a given callback function and deletes
 * the interaction reply when the user makes their selection.
 * @param msg the message shown above the dropdown
 * @param interaction the interaction with the user
 * @param linkedAlbum the album that this channel is already linked to. If this
 *        is not undefined, the given album will be omitted from the dropdown.
 * @param hideCreateAlbumOption whether the create album option should be hidden
 * @returns data regarding the selected album and the ongoing interaction
 */
export const showAlbumDropdown = async (
  msg: string,
  interaction: ChatInputCommandInteraction,
  linkedAlbum?: string,
  hideCreateAlbumOption?: boolean,
): Promise<AlbumDropdownSelectionResult | undefined> => {
  const albums: Album[] = await getAlbums();
  if (albums.length === 0 && hideCreateAlbumOption) {
    const msg = "No albums found. To create an album, use the command `/album create`.";
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(msg);
    } else {
      await interaction.reply(msg);
    }
    return;
  }

  // At the top of the menu, add an option for creating a new menu
  const createNewOptionId = Math.random().toString(); // Create a random value to avoid album name conflicts
  const menuAlbumOptions: StringSelectMenuOptionBuilder[] = getAlbumDropdownOptions(
    createNewOptionId,
    albums,
    linkedAlbum,
    hideCreateAlbumOption,
  );

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId("starter")
    .setPlaceholder("Select an album...")
    .addOptions(menuAlbumOptions);
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown);
  const responseOptions: InteractionReplyOptions = {
    ephemeral: true,
    content: msg,
    components: [row],
  };
  const response = interaction.deferred
    ? await interaction.followUp(responseOptions)
    : await interaction.reply(responseOptions);

  // Handle the album selection
  // eslint-disable-next-line jsdoc/require-jsdoc
  const collectorFilter = (i: Interaction) =>
    i.user.id === interaction.user.id && i instanceof StringSelectMenuInteraction;

  let selectInteraction: StringSelectMenuInteraction<CacheType>;
  try {
    const confirmation = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60_000,
    });
    selectInteraction = confirmation as StringSelectMenuInteraction;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    await response.edit({
      content: "Interaction timed out. Please try again.",
      components: [],
    });

    return undefined;
  }

  const selectedAlbumName = selectInteraction.values[0];
  let selectionResult: {
    selectedAlbum: AlbumSelectionData;
    dropdownInteraction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>;
  };
  if (selectedAlbumName === createNewOptionId) {
    selectionResult = await handleAlbumDropdownSelection(
      { type: AlbumSelectionType.CREATE_NEW },
      selectInteraction,
    );
  } else {
    const selection: AlbumDropdownSelection = {
      albumName: selectedAlbumName,
      albumId: albums.find((album) => album.albumName === selectedAlbumName)!.albumId,
      albumDesc:
        albums.find((album) => album.albumName === selectedAlbumName)?.description || undefined,
      type: AlbumSelectionType.EXISTING,
    };
    selectionResult = await handleAlbumDropdownSelection(selection, selectInteraction);
  }

  dropdown.setDisabled(true);
  const disabledDropdownRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    dropdown,
  );
  await response.edit({ components: [disabledDropdownRow] });
  return selectionResult;
};

/**
 * A helper function that is run once an album option has been selected. The
 * user can either choose to select an existing album, or create a new one.
 * @param selection the selection that was made
 * @param interaction the ongoing interaction
 * @returns the name of the album that was selected/created
 */
const handleAlbumDropdownSelection = async (
  selection: AlbumDropdownSelection,
  interaction: StringSelectMenuInteraction<CacheType>,
): Promise<AlbumDropdownSelectionResult> => {
  // If the user wants to create a new album
  if (selection.type === AlbumSelectionType.CREATE_NEW) {
    // Show a modal for the user to enter the details of the album
    const title = "Create & Link Album";
    const modal = getAlbumModal(title, "albumNameField", "albumDescField");
    await interaction.showModal(modal);

    const {
      albumName: albumName,
      description: albumDesc,
      modalInteraction,
    } = await getAlbumModalInputs(interaction, "albumNameField", "albumDescField");
    const albumData: AlbumSelectionData = {
      type: AlbumSelectionType.CREATE_NEW,
      albumName,
      albumDesc: albumDesc || undefined,
    };
    return { selectedAlbum: albumData, dropdownInteraction: modalInteraction };
  } else {
    // If the user wants to use an existing album
    const { albumName, albumId, albumDesc } = selection;
    const albumData: AlbumSelectionData = {
      type: AlbumSelectionType.EXISTING,
      albumName: albumName,
      albumId: albumId,
      albumDesc: albumDesc || undefined,
    };
    return { selectedAlbum: albumData, dropdownInteraction: interaction };
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
function getAlbumDropdownOptions(
  createNewOptionId: string,
  albums: Album[],
  linkedAlbum: string | undefined,
  hideCreateAlbumOption?: boolean,
): StringSelectMenuOptionBuilder[] {
  const menuAlbumOptions: StringSelectMenuOptionBuilder[] = [];
  if (
    hideCreateAlbumOption === undefined ||
    (hideCreateAlbumOption !== undefined && !hideCreateAlbumOption)
  ) {
    const createNewOption = new StringSelectMenuOptionBuilder()
      .setLabel("Add album")
      .setDescription("Set up a new album")
      .setValue(createNewOptionId)
      .setEmoji("🆕");
    menuAlbumOptions.push(createNewOption);
  }

  // Add the rest of the albums as options
  for (const album of albums) {
    if (album.albumName === linkedAlbum) {
      continue;
    }
    const option = new StringSelectMenuOptionBuilder()
      .setLabel(album.albumName)
      .setValue(album.albumName);
    if (album.description) {
      option.setDescription(album.description);
    }
    menuAlbumOptions.push(option);
  }
  return menuAlbumOptions;
}
