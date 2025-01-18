import { Collection, Message, TextBasedChannel } from "discord.js";
import { getFileDataFromAttachment } from "../../event-triggers/api/getFileDataFromAttachment";
import { MediaFileData } from "../../event-triggers/types/fileData";

/**
 * Retrieves data about all of the attachments sent in a channel.
 * @param latestMsg the latest message sent in the channel
 * @param channel the channel in question
 * @returns all the attachments sent in the channel as FileData objects
 */
export async function getChannelFilesData(
  latestMsg: Message<boolean>,
  channel: TextBasedChannel,
): Promise<MediaFileData[]> {
  const files: MediaFileData[] = [];
  let currMsgPointer: Message | undefined = latestMsg;

  while (currMsgPointer) {
    const msgPage: Collection<string, Message<boolean>> = await channel.messages.fetch({
      limit: 100,
      cache: true,
      before: currMsgPointer.id,
    });
    for (const msg of msgPage.values()) {
      const msgAttachments = msg.attachments.values();
      for (const attachment of msgAttachments) {
        const fileData = await getFileDataFromAttachment(attachment, msg.createdAt, msg.author.id);
        files.push(fileData);
      }
    }
    currMsgPointer = msgPage.size !== 0 ? msgPage.at(msgPage.size - 1) : undefined;
  }

  return files;
}
