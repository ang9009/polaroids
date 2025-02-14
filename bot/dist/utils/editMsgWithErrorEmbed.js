import { getErrorEmbed } from "./getErrorEmbed";
/**
 * Edits a given message, and replace its contents with an error embed.
 * @param interactionResponse the interaction response to be replied to
 * @param errMsg the error message displayed in the embed
 */
export async function editMsgWithErrorEmbed(interactionResponse, errMsg) {
    const errEmbed = getErrorEmbed(errMsg);
    await interactionResponse.edit({ content: "", embeds: [errEmbed] });
    return;
}
//# sourceMappingURL=editMsgWithErrorEmbed.js.map