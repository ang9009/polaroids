import { Events, Message } from "discord.js";
import { EventData } from "../../../types/eventData";

const messageCreate: EventData<Message> = {
  event: Events.MessageCreate,
  once: false,
  async execute(message: Message) {
    const channels = message.channelId;
  },
};
