import { isAxiosError } from "axios";
import { Attachment, Events, Message } from "discord.js";
import { allowedMimeTypes } from "shared/src/data/allowedMimeTypes";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { EventData } from "../../../types/eventData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { getFileDataFromUrl } from "../api/getFileDataFromUrl";
import { uploadFiles } from "../api/uploadFiles";

const messageCreate: EventData<Message> = {
  event: Events.MessageCreate,
  once: false,
  async execute(message: Message) {
    if (message.attachments.size === 0) {
      return;
    }

    let isSubscribed: boolean, linkedAlbum: string | undefined;
    try {
      ({ isSubscribed, linkedAlbum } = await getChannelSubData(message.channelId));
      if (!isSubscribed) {
        return;
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
    }

    const initialMessage = await message.reply("Uploading images...");
    const attachmentFilePromises = attachments.map((attachment) => {
      const { name, url } = attachment;
      return getFileDataFromUrl(url, name, attachment.id);
    });
    const attachmentFiles = await Promise.all(attachmentFilePromises);

    try {
      // Since isSubscribed is true, linkedAlbum will not be undefined
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
  },
};

/**
 * Validates the given attachments against the allowed MIME types.
 * @param attachments the attachments to be validated
 */
const validateAttachmentTypes = (attachments: Attachment[]) => {
  for (const attachment of attachments) {
    if (!attachment.contentType) {
      const errMsg = `Could not check the content type of ${attachment.name}. Please try again.`;
      throw Error(errMsg);
    } else if (!allowedMimeTypes.has(attachment.contentType)) {
      const errMsg = `${attachment.name} is not of a recognized photo/video type.`;
      throw Error(errMsg);
    }
  }
};

export default messageCreate;
