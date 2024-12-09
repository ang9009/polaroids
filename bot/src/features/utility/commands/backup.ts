import { Attachment, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { getChannelAttachments } from "../helpers/getChannelAttachments";
import { getLatestMsg } from "../helpers/getLatestMsg";

/**
 * A command that backs up all the images/videos in the current channel that have not
 * already been archived.
 */
const data = new SlashCommandBuilder().setName("backup").setDescription("Archives  polaroids");

/**
 * The execute function for the backup command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const thinkingReply = await interaction.deferReply();
  const channel = interaction.channel;
  if (!channel) {
    replyWithErrorEmbed(
      interaction,
      "Could not find the channel `backup` was called in. Please try again.",
    );
    return;
  }

  // ! Add message if channel is already up to date (check backu p pointer)

  const { isSubscribed } = await getChannelSubData(channel.id);
  if (isSubscribed) {
    await thinkingReply.edit("polaroids is already subscribed to this channel.");
  } else {
    const processingReply = await thinkingReply.edit({
      content: "Processing channel attachments...",
    });
    const latestMsg = await getLatestMsg(channel);
    const files: Attachment[] = await getChannelAttachments(latestMsg, channel);
    await processingReply.edit({ content: `${files.length} file(s) uploaded.` });
  }
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
