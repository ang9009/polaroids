import { CommandData } from "../../../types/commandData";
import { Album } from "./../../../../../db-api/node_modules/.prisma/client/index.d";

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  ComponentType,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { channelIsSubscribed } from "../api/channelIsSubscribed";
import { getAlbums } from "../api/getAlbumNames";

/**
 * The slash command object for "subscribe", which is exported below. This
 * command walks the user through subscribing polaroids to updates in a channel.
 * Users can choose to create a new album, or select an existing one to link to
 * the channel this command was called in.
 */
const data = new SlashCommandBuilder().setName("subscribe").setDescription(
  `Ask polaroids to watch this channel for media and automatically
     upload it to a specified album`,
);

/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const isSubscribed = await channelIsSubscribed(interaction.channelId);
  if (isSubscribed) {
    await handleSubscribedInteraction(interaction);
  } else {
    interaction.reply("Not subscribed to this channel: " + interaction.channelId);
  }
};

/**
 * Handles the interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 */
const handleSubscribedInteraction = async (interaction: ChatInputCommandInteraction) => {
  const confirmBtnId = "confirm-update-album";
  const cancelBtnId = "cancel-update-album";
  const confirm = new ButtonBuilder()
    .setCustomId(confirmBtnId)
    .setLabel("Confirm")
    .setStyle(ButtonStyle.Primary);
  const cancel = new ButtonBuilder()
    .setCustomId(cancelBtnId)
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Secondary);
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);
  const msg =
    "polaroids is already subscribed to this channel. Would you like to change the album that this channel is linked to?";

  const response = await interaction.reply({
    ephemeral: true,
    content: `${msg} \n\n `,
    components: [row],
  });

  // Handle the button clicked response
  try {
    const confirmation = (await response.awaitMessageComponent({
      time: 30_000,
    })) as ButtonInteraction<CacheType>;

    if (confirmation.customId === confirmBtnId) {
      showAlbumDropdown(confirmation);
    } else if (confirmation.customId === cancelBtnId) {
      confirmation.update({ content: "Operation cancelled.", components: [] });
    }
  } catch (e) {
    await interaction.editReply({
      content: "Timed out. Please try again.",
      components: [],
    });
  }
};

/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album.
 * @param interaction the interaction with the user
 */
const showAlbumDropdown = async (interaction: ButtonInteraction<CacheType>) => {
  let albums: Album[];
  try {
    albums = await getAlbums();
  } catch (err) {
    console.error("An error occurred trying to get the list of album names in showAlbumDropdown");
    const errEmbed = getErrorEmbed("An error occurred. Please contact dalfie.");
    interaction.update({ embeds: [errEmbed] });
    return;
  }

  const menuAlbumOptions: StringSelectMenuOptionBuilder[] = [];
  // At the top of the menu, add an option for creating a new menu
  const createNewOptionValue = Math.random().toString(); // Create a random value to avoid album name conflicts
  const createNewOption = new StringSelectMenuOptionBuilder()
    .setLabel("Add album")
    .setDescription("Set up a new album")
    .setValue(createNewOptionValue)
    .setEmoji("🆕");
  menuAlbumOptions.push(createNewOption);

  // Add the rest of the albums as options
  for (const album of albums) {
    const option = new StringSelectMenuOptionBuilder()
      .setLabel(album.albumName)
      .setDescription(album.description)
      .setValue(album.albumName);
    menuAlbumOptions.push(option);
  }

  const dropdown = new StringSelectMenuBuilder()
    .setCustomId("starter")
    .setPlaceholder("Select an album...")
    .addOptions(menuAlbumOptions);
  const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(dropdown);

  const msg =
    "Select an album to link with this channel. Photos sent here will be uploaded to the selected album.";
  const response = await interaction.update({
    content: msg,
    components: [row],
  });

  // Handle the album selection
  const collector = response.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    time: 3_600_000,
  });
  collector.on("collect", async (selectInteraction) => {
    const selection = selectInteraction.values[0];
    if (selection === createNewOptionValue) {
      selectInteraction.reply("Show modal");
    } else {
      handleAlbumSelected(selectInteraction);
    }
    interaction.deleteReply();
  });
};

const handleAlbumSelected = (interaction: StringSelectMenuInteraction<CacheType>) => {};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
