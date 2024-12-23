/**
 * Returns the user's inputs after they submit an album modal.
 * @param interaction the interaction that triggers the modal opening
 * @param albumNameFieldId the id of the modal's name field
 * @param albumDescFieldId the id of the modal's description field
 * @returns the name and description input by the user, and the modal interaction
 */
export const getAlbumModalInputs = async (interaction, albumNameFieldId, albumDescFieldId) => {
    // eslint-disable-next-line jsdoc/require-jsdoc
    const filter = (interaction) => interaction.customId === "createAlbumModal";
    const modalInteraction = await interaction.awaitModalSubmit({ filter, time: 60_000 });
    const albumName = modalInteraction.fields.getTextInputValue(albumNameFieldId);
    const albumDesc = modalInteraction.fields.getTextInputValue(albumDescFieldId);
    return { name: albumName, description: albumDesc, modalInteraction };
};
//# sourceMappingURL=getAlbumModalInputs.js.map