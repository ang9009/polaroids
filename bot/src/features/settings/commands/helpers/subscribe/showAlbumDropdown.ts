import {
  ActionRowBuilder,
  ButtonInteraction,
  CacheType,
  ComponentType,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { Album } from "../../../../../../../db-api/node_modules/.prisma/client/index.d";
import { getErrorEmbed } from "../../../../../utils/getErrorEmbed";
import { getAlbums } from "../../../api/getAlbumNames";
import { handleAlbumSelected } from "../../subscribe";

/**
 * Shows a dropdown menu which allows the user to select from a list of existing
 * albums, or create a new album.
 * @param interaction the interaction with the user
 */

export const showAlbumDropdown = async (interaction: ButtonInteraction<CacheType>) => {
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
    time: 3600000,
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
