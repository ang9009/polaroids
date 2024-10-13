import { Attachment, Message } from "discord.js";
import getImgsFromUrls from "../utils/getImgsFromUrls.js";

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message: Message) {
    // If the author is a bot (e.g. Polaroids itself)/message has no
    // attachments, do nothing
    if (message.author.bot || message.attachments.size == 0) {
      return;
    }
    const attachments = message.attachments;
    const imageUrls = attachments.map((img: Attachment) => img.url);
    const imagePromises = getImgsFromUrls(imageUrls);
    const imgs = await Promise.all(imagePromises);

    message.reply("Images received!");
  },
};
