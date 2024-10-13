import { Message } from "discord.js";

module.exports = {
  name: "messageCreate",
  once: false,
  execute(message: Message) {
    // If the author is a bot (e.g. Polaroids itself), do nothing to avoid
    // triggering an infinite loop
    if (message.author.bot) {
      return;
    }
    console.log(message.content);
    message.reply("Images received!");
  },
};
