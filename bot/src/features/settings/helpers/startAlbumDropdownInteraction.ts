import {
  CacheType,
  ChatInputCommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";
import { AlbumDropdownSelection } from "../data/albumDropdownSelection";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { getCreateAlbumModal } from "./getCreateAlbumModal";
import { showAlbumDropdown } from "./showAlbumDropdown";

/**
 * Deals with user interactions with the album dropdown. If the user wants to
 * create a new album, this opens a modal where the user can fill in the album's
 * details. Otherwise, this sets the album this channel is linked to to the newly
 * specified album.
 * @param interaction the ongoing command interaction
 * @param message the message shown above the dropdown
 * @param onSelectionComplete a callback function that is called when the user
 *        finishes selecting/creating the desired album
 * @param linkedAlbum the album that this channel is already linked to. This
 *        album will be omitted from the dropdown.
 */
export const startAlbumDropdownInteraction = async (
  interaction: ChatInputCommandInteraction,
  message: string,
  onSelectionComplete: (
    albumData: AlbumSelectionData,
    interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  ) => void,
  linkedAlbum?: string,
) => {
  await showAlbumDropdown(
    message,
    interaction,
    (selection, interaction) => onAlbumSelect(selection, interaction, onSelectionComplete),
    linkedAlbum,
  );
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
