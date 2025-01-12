import { Attachment, Events, Message } from "discord.js";
import { allowedMimeTypes } from "shared/src/data/allowedMimeTypes";
import { getChannelSubData } from "../../../services/getChannelSubData";
import { EventData } from "../../../types/eventData";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { uploadAttachmentsWithProgress } from "../helpers/uploadFilesWithProgress";

/**
 * The execute function for messageCreate.
 * @param message the message that triggered this event
 */
const execute = async (message: Message) => {
  if (message.attachments.size === 0) {
    return;
  }

  // Check if there the channel is already subscribed to
  let linkedAlbumData;
  try {
    const subData = await getChannelSubData(message.channelId);
    if (!subData.isSubscribed) {
      return;
    } else {
      linkedAlbumData = subData;
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

  const { linkedAlbumId, linkedAlbumName } = linkedAlbumData;
  await uploadAttachmentsWithProgress(message, linkedAlbumId, linkedAlbumName);
};

/**
 * Validates the given attachments against the allowed MIME types.
 * @param attachments the attachments to be validated
 */
const validateAttachmentTypes = (attachments: Attachment[]) => {
  let errMsg: string;
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

const messageCreate: EventData<Message> = {
  event: Events.MessageCreate,
  once: false,
  execute: execute,
};

export default messageCreate;
