import axios, { isAxiosError } from "axios";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";

const data = new SlashCommandBuilder()
  .setName("unsubscribe")
  .setDescription("Make polaroids stop watching for attachments in a channel")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setRequired(false)
      .setDescription(
        "The channel to unsubscribe from. Leave this empty to unsubscribe from the current channel",
      ),
  );

/**
 * The execute function for the "unsubscribe" command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const channelOption = interaction.options.getChannel("channel");
  const channel = channelOption || interaction.channel;
  if (!channel) {
    throw Error("Could not find channel");
  }

  await interaction.deferReply();
  try {
    const { isSubscribed } = await getChannelSubData(channel.id);
    if (!isSubscribed) {
      const errEmbed = getErrorEmbed("polaroids is not subscribed to this channel.");
      await interaction.editReply({ embeds: [errEmbed] });
      return;
    }
  } catch (err) {
    const msg = `Something went wrong while attempting to get channel subscription data: ${err}`;
    console.error(msg);
    return;
  }

  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/subscribed-channels/${channel.id}`;
  try {
    await axios.delete(url);
  } catch (err) {
    if (isAxiosError(err)) {
      console.error("Failed to unsubscribe: " + err.message);
    }
    const errEmbed = getErrorEmbed(
      `Failed to unsubscribe from ${channel.toString()}. Please try again.`,
    );
    interaction.editReply({ embeds: [errEmbed] });
    return;
  }
  interaction.editReply(`Successfully unsubscribed from ${channel.toString()}.`);
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
