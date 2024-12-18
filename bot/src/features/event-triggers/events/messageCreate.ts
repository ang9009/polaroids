import { Attachment, EmbedBuilder, Events, Message } from "discord.js";
import { allowedMimeTypes } from "shared/src/data/allowedMimeTypes";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { PrimaryColors } from "../../../data/primaryColors";
import { EventData } from "../../../types/eventData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { getFileDataFromAttachment } from "../api/getFileDataFromAttachment";
import { uploadFiles } from "../api/uploadFiles";

/**
 * The execute function for messageCreate.
 * @param message the message that triggered this event
 */
const execute = async (message: Message) => {
  if (message.attachments.size === 0) {
    return;
  }

  // Check if there the channel is already subscribed to
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

  const uploadStatusEmbed = new EmbedBuilder()
    .setTitle("Attachment upload")
    .setFields([
      { name: "Status", value: `Processing ${attachments.length} file(s)...` },
      { name: "Album", value: linkedAlbum },
      { name: "Sent by", value: message.author.toString() },
    ])
    .setColor(PrimaryColors.PRIMARY_WHITE);
  const initialMessage = await message.reply({ embeds: [uploadStatusEmbed] });

  const attachmentFilePromises = attachments.map((attachment) => {
    return getFileDataFromAttachment(attachment, message.createdAt, message.author.id);
  });
  const attachmentFiles = await Promise.all(attachmentFilePromises);
  try {
    await uploadFiles(attachmentFiles, linkedAlbum!, true);
  } catch (err) {
    console.error(err);
    const errEmbed = getErrorEmbed(
      "Something went wrong while uploading your media. Please try again.",
    );
    initialMessage.edit({ content: "", embeds: [errEmbed] });
    return;
  }

  uploadStatusEmbed
    .spliceFields(0, 1, {
      name: "Status",
      value: `Successfully uploaded ${attachmentFiles.length} file(s)`,
    })
    .setColor(PrimaryColors.SUCCESS_GREEN);
  initialMessage.edit({ embeds: [uploadStatusEmbed] });
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
