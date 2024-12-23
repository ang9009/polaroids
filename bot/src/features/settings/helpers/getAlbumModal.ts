import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

/**
 * Returns a modal with two fields used for album creation: the album's unique
 * name, and its description. The custom id for the modal itself is
 * createAlbumModal, and its field ids are albumNameField and albumDescField
 * respectively. The album name and description fields have min and max
 * restrictions of (1, 20) and (1, 40) respectively.
 * @param title the title of the modal
 * @param albumNameInputId the id of the name input
 * @param albumDescInputId the id of the description input
 * @param albumNamePlaceholder the placeholder for the name
 * @param albumDescPlaceholder the placeholder for the description
 * @returns a ModalBuilder object that represents the create album modal
 */
export const getAlbumModal = (
  title: string,
  albumNameInputId: string,
  albumDescInputId: string,
  albumNamePlaceholder?: string,
  albumDescPlaceholder?: string | null,
): ModalBuilder => {
  const albumNameField = new TextInputBuilder()
    .setCustomId(albumNameInputId)
    .setLabel("Album name")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Enter album name...")
    .setMinLength(1)
    .setMaxLength(20)
    .setRequired();
  const albumDescField = new TextInputBuilder()
    .setCustomId(albumDescInputId)
    .setLabel("Album description")
    .setPlaceholder("Enter album description...")
    .setMinLength(1)
    .setMaxLength(40)
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false);
  const albumNameRow = new ActionRowBuilder<TextInputBuilder>().addComponents(albumNameField);
  const albumDescRow = new ActionRowBuilder<TextInputBuilder>().addComponents(albumDescField);
  if (albumNamePlaceholder) {
    albumNameField.setValue(albumNamePlaceholder);
  }
  if (albumDescPlaceholder) {
    albumDescField.setValue(albumDescPlaceholder);
  }

  const modal = new ModalBuilder()
    .setCustomId("createAlbumModal")
    .setTitle(title)
    .addComponents(albumNameRow, albumDescRow);
  return modal;
};
