import { Events } from "discord.js";
import { allowedMimeTypes } from "shared/src/data/allowedMimeType";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { uploadAttachmentsWithProgress } from "../helpers/uploadFilesWithProgress";
/**
 * The execute function for messageCreate.
 * @param message the message that triggered this event
 */
const execute = async (message) => {
  if (message.attachments.size === 0) {
    return;
  }
  // Check if there the channel is already subscribed to
  let linkedAlbum;
  try {
    const subData = await getChannelSubData(message.channelId);
    if (!subData.isSubscribed) {
      return;
    } else {
      linkedAlbum = subData.linkedAlbum;
    }
  } catch (err) {
    const msg = `Something went wrong while attempting to get channel subscription data: ${err}`;
    console.error(msg);
    return;
  }
  // Check if the attachments are of valid MIME types
  const attachments = [...message.attachments.values()];
  try {
    validateAttachmentTypes(attachments);
  } catch (err) {
    if (err instanceof Error) {
      replyWithErrorEmbed(message, err.message);
    }
    return;
  }
  await uploadAttachmentsWithProgress(message, linkedAlbum);
};
/**
 * Validates the given attachments against the allowed MIME types.
 * @param attachments the attachments to be validated
 */
const validateAttachmentTypes = (attachments) => {
  let errMsg;
  for (const attachment of attachments) {
    if (!attachment.contentType) {
      errMsg = `Could not check the content type of ${attachment.name}. Please try again.`;
      throw Error(errMsg);
    } else if (!allowedMimeTypes.has(attachment.contentType)) {
      errMsg = `${attachment.name} is not of a recognized photo/video type. Please try again.`;
      throw Error(errMsg);
    }
  }
};
const messageCreate = {
  event: Events.MessageCreate,
  once: false,
  execute: execute,
};
export default messageCreate;
//# sourceMappingURL=messageCreate.js.map
