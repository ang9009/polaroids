import {
  CommandInteraction,
  MessageComponentInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { Album } from "../../../../../backend/generated/zod";

/**
 * Returns the user's inputs after they submit an album modal.
 * @param interaction the interaction that triggers the modal opening
 * @param albumNameFieldId the id of the modal's name field
 * @param albumDescFieldId the id of the modal's description field
 * @returns the name and description input by the user, and the modal interaction
 */
export const getAlbumModalInputs = async (
  interaction: MessageComponentInteraction | CommandInteraction,
  albumNameFieldId: string,
  albumDescFieldId: string,
): Promise<Omit<Album, "createdAt"> & { modalInteraction: ModalSubmitInteraction }> => {
  // eslint-disable-next-line jsdoc/require-jsdoc
  const filter = (interaction: ModalSubmitInteraction) =>
    interaction.customId === "createAlbumModal";
  const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 60_000 });
  const albumName: string = modalInteraction.fields.getTextInputValue(albumNameFieldId);
  const albumDesc: string = modalInteraction.fields.getTextInputValue(albumDescFieldId);

  return { name: albumName, description: albumDesc, modalInteraction };
};
