import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
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
 *
 * @param interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  if (!interaction.channel) {
    console.error("Could not find channel in backup command");
    replyWithErrorEmbed(interaction, "Something went wrong. Please try again.");
    return;
  }

  const channel = interaction.channel;
  const latestMsg = await channel.messages.fetch({ limit: 1 });
  console.log(latestMsg);
  interaction.reply("Bruh");
};

const commandData: CommandData = {
  data,
  execute,
};
export default commandData;
