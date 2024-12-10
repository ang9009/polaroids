import {
  Attachment,
  ChatInputCommandInteraction,
  Collection,
  Message,
  SlashCommandBuilder,
  TextBasedChannel,
} from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";

/**
 * A command that backs up all the images/videos in the current channel that have not
 * already been archived.
 */
const data = new SlashCommandBuilder()
  .setName("backup")
  .setDescription(
    "Backs up all the attachments in this channel that have not already been archived by polaroids",
  );

/**
 * The execute function for the backup command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const initialReply = await interaction.reply({
    content: "Processing channel attachments...",
    ephemeral: true,
  });
  const channel = interaction.channel;
  if (!channel) {
    replyWithErrorEmbed(
      interaction,
      "Could not find the channel `backup` was called in. Please try again.",
    );
    return;
  }

  let backupAlbum: string;
  // const { isSubscribed, linkedAlbum } = getChannelSubData(channel.id);
  // if (isSubscribed) {
  //   backupAlbum = linkedAlbum;
  // } else {
  // }
  let latestMsg: Message;
  try {
    latestMsg = await getLatestMsg(channel);
  } catch (err) {
    if (err instanceof Error) {
      replyWithErrorEmbed(interaction, err.message);
    }
    return;
  }

  const files: Attachment[] = await getChannelAttachments(latestMsg, channel);
  initialReply.edit({ content: `${files.length} file(s) uploaded.` });
};

/**
 * Returns the latest message in the channel the interaction occurred in.
 * @param channel the channel
 * @returns the message id
 */
const getLatestMsg = async (channel: TextBasedChannel): Promise<Message> => {
  const latestMsgData = await channel.messages.fetch({ limit: 1 });
  const { value: latestMsg } = latestMsgData.values().next();
  if (!latestMsg) {
    throw Error("Failed to get latest message.");
  }
  return latestMsg;
};

/**
 * Retrieves all the attachments sent in a channel.
 * @param latestMsg the latest message sent in the channel
 * @param channel the channel in question
 * @returns all the attachments sent in the channel
 */
async function getChannelAttachments(latestMsg: Message<boolean>, channel: TextBasedChannel) {
  const attachments: Attachment[] = [];
  let currMsgPointer: Message | undefined = latestMsg;

  while (currMsgPointer) {
    const msgPage: Collection<string, Message<boolean>> = await channel.messages.fetch({
      limit: 100,
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

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
