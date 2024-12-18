import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
/**
 * Returns a modal with two fields used for album creation: the album's unique
 * name, and its description. The custom id for the modal itself is
 * createAlbumModal, and its field ids are albumNameField and albumDescField
 * respectively. The album name and description fields have min and max
 * restrictions of (1, 20) and (1, 40) respectively.
 * @param title the title of the modal
 * @returns a ModalBuilder object that represents the create album modal
 */
export const getCreateAlbumModal = (title) => {
    const albumNameField = new TextInputBuilder()
        .setCustomId("albumNameField")
        .setLabel("Album name")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("Enter album name...")
        .setMinLength(1)
        .setMaxLength(20)
        .setRequired();
    const albumDescField = new TextInputBuilder()
        .setCustomId("albumDescField")
        .setLabel("Album description")
        .setPlaceholder("Enter album description...")
        .setMinLength(1)
        .setMaxLength(40)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);
    const albumNameRow = new ActionRowBuilder().addComponents(albumNameField);
    const albumDescRow = new ActionRowBuilder().addComponents(albumDescField);
    const modal = new ModalBuilder()
        .setCustomId("createAlbumModal")
        .setTitle(title)
        .addComponents(albumNameRow, albumDescRow);
    return modal;
};
//# sourceMappingURL=getCreateAlbumModal.js.map