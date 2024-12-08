import { isAxiosError } from "axios";
import { Events, Message } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { EventData } from "../../../types/eventData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { getFileDataFromUrl } from "../api/getFileDataFromUrl";
import { uploadMedia } from "../api/uploadMedia";

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

    const initialMessage = await message.reply("Uploading images...");
    const attachments = [...message.attachments.values()];
    const attachmentFilePromises = attachments.map((attachment) => {
      const { name, url } = attachment;
      return getFileDataFromUrl(url, name, attachment.id);
    });
    const attachmentFiles = await Promise.all(attachmentFilePromises);
    try {
      // Since isSubscribed is true, linkedAlbum will not be undefined
      await uploadMedia(attachmentFiles, linkedAlbum!);
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

export default messageCreate;
