import { Events, Message } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { EventData } from "../../../types/eventData";

const messageCreate: EventData<Message> = {
  event: Events.MessageCreate,
  once: false,
  async execute(message: Message) {
    if (message.attachments.size === 0) {
      return;
    }

    const { isSubscribed, linkedAlbum } = await getChannelSubData(message.channelId);
    if (!isSubscribed) {
      return;
    }
  },
};

export default messageCreate;
