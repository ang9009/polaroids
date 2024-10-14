import { Message } from "discord.js";
import { ContentData } from "../@types/contentData.js";
import formatBytes from "../utils/formatBytes.js";
import getBlobsFromUrls from "../utils/getImgsFromUrls.js";

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
    const attachmentUrls = attachments.map((item) => item.url);

    // Get all blobs from attachment urls, the date the images were sent
    const blobs = await getBlobsFromUrls(attachmentUrls);
    const date = new Date(message.createdTimestamp);
    const ids = attachments.map((item) => item.id);
    // TODO: create list of content types as well, should be enums

    const imagesData = blobs.map((blob, i) => {
      const id = ids[i];
      const data: ContentData = {
        file: blob,
        id: id,
        date: date,
        people: [],
        contentType: 
      };
      return data;
    });
    console.log(imagesData);

    const totalSizeBytes = attachments.reduce(
      (size, curr) => size + curr.size,
      0
    );
    const totalSize = formatBytes(totalSizeBytes);

    // TODO: Add loading bar + how many photos/size was uploaded

    // message.reply("Images received!");
  },
};
