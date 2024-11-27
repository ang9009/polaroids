import { ChatInputCommandInteraction, ModalBuilder, ModalSubmitInteraction } from "discord.js";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { createAlbumFromModalInputs } from "./createAlbumFromModalInputs";
import { getCreateAlbumModal } from "./getCreateAlbumModal";
import { showAlbumDropdown } from "./showAlbumDropdown";

/**
 * Deals with user interactions with the album dropdown. If the user wants to
 * create a new album, this opens a modal where the user can fill in the album's
 * details. Otherwise, this sets the album this channel is linked to to the newly
 * specified album.
 * @param interaction the ongoing command interaction
 * @param message the message shown above the dropdown
 */
export const handleAlbumSelection = async (
  interaction: ChatInputCommandInteraction,
  message: string,
) => {
  await showAlbumDropdown(message, interaction, async (selection, interaction) => {
    if (selection.type == AlbumSelectionType.CREATE_NEW) {
      const title = "Create & Link Album";
      const modal: ModalBuilder = getCreateAlbumModal(title);
      await interaction.showModal(modal);

      // eslint-disable-next-line jsdoc/require-jsdoc
      const filter = (interaction: ModalSubmitInteraction) =>
        interaction.customId === "createAlbumModal";

      interaction.awaitModalSubmit({ filter, time: 60_000 }).then(createAlbumFromModalInputs);
    } else {
      // Link existing album and show success message
    }
  });
};
