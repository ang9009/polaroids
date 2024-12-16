import { getErrorEmbed } from "./getErrorEmbed";
/**
 * Replies to a given message with an error embed.
 * @param interactionOrMessage the message/interaction to be replied to
 * @param errMsg the error message displayed in the embed
 */
export function replyWithErrorEmbed(interactionOrMessage, errMsg) {
    const errEmbed = getErrorEmbed(errMsg);
    interactionOrMessage.reply({ content: "", embeds: [errEmbed] });
    return;
}
//# sourceMappingURL=replyWithErrorEmbed.js.map