import { CommandData } from "../../../types/commandData";

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { channelIsSubscribed } from "../api/channelIsSubscribed";

const data = new SlashCommandBuilder().setName("subscribe").setDescription(
  `Ask polaroids to watch this channel for media and automatically
     upload it to a specified album`,
);

/**
 * Registers the guild with polaroids, and associates an album with the guild.
 * Users can choose to create a new album, or select an existing one.
 * @param interaction the interaction object associated with the interaction
 */
async function execute(interaction: ChatInputCommandInteraction) {
  const isSubscribed = await channelIsSubscribed(interaction.channelId);
  if (isSubscribed) {
    const confirm = new ButtonBuilder()
      .setCustomId("confirm-update-album")
      .setLabel("Confirm")
      .setStyle(ButtonStyle.Primary);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel-update-album")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);

    const msg =
      "polaroids is already subscribed to this channel. Would you like to change the album that this channel is linked to?";

    await interaction.reply({
      ephemeral: true,
      content: msg,
      components: [row],
    });
  } else {
    interaction.reply("Not subscribed to this channel: " + interaction.channelId);
  }
  // TODO: Check if databsae already has channel added. If it does, show a
  // warning message and an option to change the album attached
  // "polaroids is already watching this channel. Would you like to link a
  // different album to this channel?"

  //   TODO: Use the selection menu that discord.js provides
  //   TODO: try using defer for loading state
  //   TODO: also set up the watched channels here
}

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
