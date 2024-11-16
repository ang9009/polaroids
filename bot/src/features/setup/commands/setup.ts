import { PrimaryColors } from "../../../data/primaryColors";
import { addGuildToDb } from "../api/addGuildToDb";
import { CommandData } from "./../../../types/commandData";

import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("goat").setDescription("Check who the GOAT is");

/**
 * Informs the user of who the GOAT is.
 * @param interaction the interaction object associated with the interaction
 */
async function execute(interaction: ChatInputCommandInteraction) {
  const id = interaction.guildId;
  if (!id) {
    throw Error("Could not get guild id");
  }
  const result = await addGuildToDb(id);
  if (!result.success) {
    const errorMsg = new EmbedBuilder()
      .setTitle("Something went wrong")
      .setDescription(result.error)
      .setColor(PrimaryColors.FAILURE_RED);
    interaction.reply({ embeds: [errorMsg] });
  }

  await interaction.reply("Lucia Nunez is the goat");
}

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
