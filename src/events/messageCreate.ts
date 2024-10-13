import { Events, Message } from "discord.js";

module.exports = {
  name: Events.MessageCreate,
  once: true,
  execute(message: Message) {
    console.log(message.content);
  },
};
