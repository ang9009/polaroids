import { EmbedBuilder } from "discord.js";
import { PrimaryColors } from "../data/primaryColors";

/**
 * Creates an error embed based on a given message.
 * @param errorMsg the error message
 * @returns an EmbedBuilder with the given message
 */
export const getErrorEmbed = (errorMsg: string): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle("Something went wrong")
    .setDescription(errorMsg)
    .setColor(PrimaryColors.FAILURE_RED);
  return embed;
};
