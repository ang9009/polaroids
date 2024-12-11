import { Attachment, Collection, Message, TextBasedChannel } from "discord.js";

/**
 * Retrieves all the attachments sent in a channel.
 * @param latestMsg the latest message sent in the channel
 * @param channel the channel in question
 * @returns all the attachments sent in the channel
 */
export async function getChannelAttachments(
  latestMsg: Message<boolean>,
  channel: TextBasedChannel,
) {
  const attachments: Attachment[] = [];
  let currMsgPointer: Message | undefined = latestMsg;

  while (currMsgPointer) {
    const msgPage: Collection<string, Message<boolean>> = await channel.messages.fetch({
      limit: 100,
      cache: true,
      before: currMsgPointer.id,
    });
    for (const msg of msgPage.values()) {
      const msgAttachments = msg.attachments.values();
      for (const file of msgAttachments) {
        attachments.push(file);
      }
    }
    currMsgPointer = msgPage.size !== 0 ? msgPage.at(msgPage.size - 1) : undefined;
  }

  return attachments;
}
