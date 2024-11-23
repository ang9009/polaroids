import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";

export const replyWithErrorEmbed = async (
  interaction: ChatInputCommandInteraction<CacheType>,
  msg: string,
) => {
  const errEmbed = getErrorEmbed(msg);
  await interaction.editReply({ embeds: [errEmbed] });
};
