import { CommandData } from "../../../types/commandData";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder().setName("watch").setDescription(
  `Ask polaroids to watch this channel for media and automatically
     upload it to a specified album`,
);

/**
 * Registers the guild with polaroids, and associates an album with the guild.
 * Users can choose to create a new album, or select an existing one.
 * @param interaction the interaction object associated with the interaction
 */
async function execute(interaction: ChatInputCommandInteraction) {
  // TODO: Check if databsae already has channel added. If it does, show a
  // warning message

  //   TODO: Use the selection menu that discord.js provides
  //   TODO: try using defer for loading state
  //   TODO: also set up the watched channels here

  await interaction.reply("Lucia Nunez is the goat");
}

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
