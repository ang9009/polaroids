import { ModalSubmitInteraction } from "discord.js";

/**
 * Creates an album based on the fields in the given modal submit interaction
 * object. A helper method used in handleAlbumSelection.
 * @param interaction the modal submit interaction
 */
export const createAlbumFromModalInputs = (interaction: ModalSubmitInteraction) => {
  const albumName = interaction.fields.getTextInputValue("albumNameField");
  const albumDescField = interaction.fields.getTextInputValue("albumDescField");
};
