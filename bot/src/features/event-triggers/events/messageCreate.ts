import { isAxiosError } from "axios";
import { Attachment, Events, Message } from "discord.js";
import { allowedMimeTypes } from "shared/src/data/allowedMimeTypes";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { EventData } from "../../../types/eventData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { getFileDataFromUrl } from "../api/getFileDataFromUrl";
import { uploadFiles } from "../api/uploadFiles";

/**
 * The execute function for messageCreate.
 * @param message the message that triggered this event
 */
const execute = async (message: Message) => {
  if (message.attachments.size === 0) {
    return;
  }

  let linkedAlbum: string;
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

  const initialMessage = await message.reply("Uploading images...");

  const messageCreatedAt = new Date(message.createdTimestamp * 1000);
  const attachmentFilePromises = attachments.map((attachment) => {
    const { name, url, id } = attachment;
    return getFileDataFromUrl(url, name, id, messageCreatedAt);
  });
  const attachmentFiles = await Promise.all(attachmentFilePromises);

  try {
    await uploadFiles(attachmentFiles, linkedAlbum!);
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`Something went wrong while attempting to upload images: ${err.message}`);
    }
    const errEmbed = getErrorEmbed(
      "Something went wrong while uploading your media. Please try again.",
    );
    initialMessage.edit({ content: "", embeds: [errEmbed] });
    return;
  }

  initialMessage.edit(`Successfully uploaded ${attachmentFiles.length} file(s).`);
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
