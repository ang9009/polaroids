import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
} from "discord.js";
import { showAlbumDropdown } from "./showAlbumDropdown";

/**
 * Handles the interaction when the channel is already subscribed to.
 * @param interaction the interaction in question
 */
export const handleSubscribedInteraction = async (interaction: ChatInputCommandInteraction) => {
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
