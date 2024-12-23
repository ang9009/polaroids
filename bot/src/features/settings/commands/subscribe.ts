import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  TextChannel,
} from "discord.js";
import { IsSubscribedResponse } from "shared/src/responses/subscribed-channels/isSubscribed";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { handleAlbumSelection } from "../helpers/handleAlbumSelection";
import { performBackupWithProgress } from "../helpers/performBackupWithProgress";
import { showAlbumDropdown } from "../helpers/showAlbumDropdown";

/**
 * A command used to subscribe polaroids to changes in a channel, and uploads attachments
 * to an album that is specified after this command is invoked. Users can choose to create
 * a new album, or select an existing one to link to the channel this command was called in.
 */
const data = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Ask polaroids to archive any attachments sent in a channel")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription(
        "The channel to be subscribed to. Leave this empty to subscribe to the current channel",
      ),
  );

/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const channelArg = interaction.options.getChannel("channel");
  if (channelArg && !(channelArg instanceof TextChannel)) {
    replyWithErrorEmbed(interaction, "Only text channels can be subscribed to.");
    return;
  }

  const channel = channelArg || (interaction.channel as TextChannel);
  if (!channel) {
    throw Error("Could not find channel");
  }
  const channelSubData: IsSubscribedResponse = await getChannelSubData(channel.id);
  const linkedAlbum = channelSubData.isSubscribed ? channelSubData.linkedAlbum : undefined;

  const isAlreadySubscribedMsg =
    `${channel.toString()} is currently linked to album **${linkedAlbum}**. ` +
    "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
  const notSubscribedMsg = `Select an album to link ${channel.toString()} to.`;
  const msg = channelSubData.isSubscribed ? isAlreadySubscribedMsg : notSubscribedMsg;

  const dropdownSelectionRes = await showAlbumDropdown(msg, interaction, linkedAlbum);
  if (dropdownSelectionRes === undefined) {
    return;
  }

  const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
  const dropdownSelectionRes = await showAlbumDropdown(msg, interaction, linkedAlbum);
  if (dropdownSelectionRes === undefined) {
    return;
  }

  const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
  const { guildId, channelId } = interaction;
  if (!channelId) {
    throw Error("Could not find channel id");
  }

  // Link the channel to the album according to the user's instructions
  try {
    await handleAlbumSelection(selectedAlbum, channelId, guildId, channelSubData.isSubscribed);
  } catch (err) {
    let errMsg = "An unknown error occurred. Please try again.";
    if (err instanceof Error) {
      errMsg = err.message;
    }
    const errEmbed = getErrorEmbed(errMsg);
    dropdownInteraction.reply({ content: "", embeds: [errEmbed] });
    return;
  }
  await dropdownInteraction.reply(
    `Successfully linked channel to album **${selectedAlbum.albumName}**.`,
  );

  // Ask user if they would like to back up previously uploaded attachments
  await startBackupInteraction(channel, selectedAlbum.albumName, interaction);
};

/**
 * Asks the user if they would like to back up previously uploaded attachments
 * with the option to confirm or cancel.
 * @param channel the channel the interaction is taking place in
 * @param albumName the nam eof the album the channel is linked to
 * @param interaction the ongoing interaction
 */
async function startBackupInteraction(
  channel: TextChannel,
  albumName: string,
  interaction: ChatInputCommandInteraction<CacheType>,
) {
  const confirmBtnId = "confirm";
  const cancelBtnId = "cancel";
  const confirm = new ButtonBuilder()
    .setCustomId(confirmBtnId)
    .setLabel("Confirm")
    .setStyle(ButtonStyle.Primary);
  const cancel = new ButtonBuilder()
    .setCustomId(cancelBtnId)
    .setLabel("Cancel")
    .setStyle(ButtonStyle.Secondary);
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(confirm, cancel);
  const backupOptionsFollowUp = await interaction.followUp({
    content:
      `Would you like me to look through ${channel.toString()}'s message history ` +
      `and backup any unarchived files to its linked album **${albumName}**?`,
    components: [row],
  });

  try {
    const confirmation = await backupOptionsFollowUp.awaitMessageComponent({
      // eslint-disable-next-line jsdoc/require-jsdoc
      filter: (i) => i.user.id === interaction.user.id,
      time: 60_000,
      time: 60_000,
    });

    if (confirmation.customId === confirmBtnId) {
      await backupOptionsFollowUp.delete();
      await performBackupWithProgress(channel, albumName, interaction.user);
    } else if (confirmation.customId === cancelBtnId) {
      await backupOptionsFollowUp.edit({
        content:
          "Backup operation cancelled. " +
          "You can find and upload unarchived files using `/backup` anytime.",
        components: [],
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    await backupOptionsFollowUp.edit({
      content: "Timed out. " + "You can find and upload unarchived files using `/backup` anytime.",
      components: [],
    });
  }
}

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
