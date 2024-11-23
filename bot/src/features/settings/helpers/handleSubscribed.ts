import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
} from "discord.js";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { replyWithErrorEmbed } from "../utils/replyWithErrorEmbed";
import { showAlbumDropdown } from "./showAlbumDropdown";

/**
 * Handles the interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 */
export const handleSubscribed = async (interaction: ChatInputCommandInteraction) => {
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
      time: 30000,
    })) as ButtonInteraction<CacheType>;

    if (confirmation.customId === confirmBtnId) {
      try {
        // ! Refactor this into another function, since this will be used in handleNotSubscribed
        // ! Try to clean this function up/ask Nunez for help
        await showAlbumDropdown(confirmation, (selection) => {
          if (selection.type == AlbumSelectionType.CREATE_NEW) {
          } else {
          }
        });
      } catch (err) {
        await replyWithErrorEmbed(interaction, "Something went wrong. Please try again.");
        return;
      }
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
