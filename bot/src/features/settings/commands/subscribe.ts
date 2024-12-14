import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
  TextChannel,
} from "discord.js";
import { IsSubscribedResponse } from "shared/src/responses/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { createAlbumAndLinkChannel } from "../api/createAlbumAndLinkChannel";
import { setChannelAlbum } from "../api/setChannelAlbum";
import { subscribeChannelAndSetAlbum } from "../api/subscribeChannelAndSetAlbum";
import { subscribeChannelWithNewAlbum } from "../api/subscribeChannelWithNewAlbum.ts";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
import { performBackupWithProgress } from "../helpers/performBackupWithProgress";
import { showAlbumDropdown } from "../helpers/showAlbumDropdown";

/**
 * A command used to subscribe polaroids to changes in a channel, and uploads attachments
 * to an album that is specified after this command is invoked. Users can choose to create
 * a new album, or select an existing one to link to the channel this command was called in.
 */
const data = new SlashCommandBuilder()
  .setName("subscribe")
  .setDescription("Ask polaroids to archive any attachments sent in this channel");

/**
 * A helper function that handles  the user's album selection: if the user wants
 * to create a new album,  then this should do so using the given name and
 * description. If the user wants to select an existing album, this should link
 * the current channel with the specified album. If the channel has already been
 * subscribed to, this should send a PATCH request instead of a POST request.
 * @param albumData data regarding the specified album
 * @param channelId the channel id the interaction is occurring in
 * @param guildId the guild id of the current guild
 * @param alreadySubscribed whether the channel has already been subscribed to
 */
const handleAlbumSelection = async (
  albumData: AlbumSelectionData,
  channelId: string | null,
  guildId: string | null,
  alreadySubscribed: boolean,
) => {
  if (!guildId || !channelId) {
    throw Error("guildId or channelId is undefined");
  }

  if (albumData.type === AlbumSelectionType.CREATE_NEW) {
    const { albumName: newAlbumName, albumDesc: newAlbumDesc } = albumData;
    const albumExists = await checkAlbumExists(newAlbumName);
    if (albumExists) {
      throw Error("An album with this name already exists! Please try again.");
    }

    // If channel is already subscribed to, create album and link the existing
    // channel to it
    if (alreadySubscribed) {
      await createAlbumAndLinkChannel(newAlbumName, newAlbumDesc, channelId, guildId);
    } else {
      // Otherwise, create a new album and save the channel
      await subscribeChannelWithNewAlbum(newAlbumName, newAlbumDesc, channelId, guildId);
    }
  } else {
    // If user wants to use existing album
    const { albumName: newAlbumName } = albumData;

    // If channel is already subscribed to, change its linked album
    if (alreadySubscribed) {
      await setChannelAlbum(newAlbumName, channelId, guildId);
    } else {
      // Otherwise, save the channel and set its linked album
      await subscribeChannelAndSetAlbum(newAlbumName, channelId, guildId);
    }
  }
};

/**
 * A helper function that is run once the user has selected/created an album.
 * @param albumData data regarding the album selected/created
 * @param interaction the ongoing interaction
 * @param alreadySubscribed whether the current channel has already been
 *         subscribed to
 * @returns the name of the album, or undefined if the selection is invalid
 */
export const onAlbumSelectionComplete = async (
  albumData: AlbumSelectionData,
  interaction: StringSelectMenuInteraction<CacheType> | ModalSubmitInteraction<CacheType>,
  alreadySubscribed: boolean,
) => {
  const { guildId, channelId } = interaction;
  if (!channelId) {
    throw Error("Could not find channel id");
  }
  const channel = interaction.guild?.channels.cache.get(channelId) as TextChannel;
  // Link the channel to the album according to the user's instructions
  try {
    await handleAlbumSelection(albumData, channelId, guildId, alreadySubscribed);
  } catch (err) {
    if (err instanceof Error) {
      const errEmbed = getErrorEmbed(err.message);
      interaction.reply({ content: "", embeds: [errEmbed] });
      return;
    }
  }
  await channel.send(`Successfully linked channel to album **${albumData.albumName}**.`);

  // Ask user if they would like to back up previously uploaded attachments
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
  const backupOptionsFollowUp = await channel.send({
    content:
      "Would you like me to look through this channel's history " +
      "and backup any unarchived files to its linked album?",
    components: [row],
  });

  try {
    const confirmation = await backupOptionsFollowUp.awaitMessageComponent({
      // eslint-disable-next-line jsdoc/require-jsdoc
      filter: (i) => i.user.id === interaction.user.id,
      time: 60_000,
    });

    if (confirmation.customId === confirmBtnId) {
      await backupOptionsFollowUp.delete();
      await performBackupWithProgress(channel, albumData, interaction.user);
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
      content:
        "No response was received." +
        "You can find and upload unarchived files using `/backup` anytime.",
      components: [],
    });
  }
};

/**
 * The execute function for the "subscribe" command.
 * @param interaction the interaction object associated with the interaction
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const channelSubData: IsSubscribedResponse = await getChannelSubData(interaction.channelId);

  const linkedAlbum = channelSubData.isSubscribed ? channelSubData.linkedAlbum : undefined;

  const isAlreadySubscribedMsg =
    `This channel is currently linked to album **${linkedAlbum}**. ` +
    "Select a new album from the dropdown below to change this, or unsubscribe using `/unsubscribe`\n";
  const notSubscribedMsg = "Select an album to link this channel to.";
  const msg = channelSubData.isSubscribed ? isAlreadySubscribedMsg : notSubscribedMsg;

  // Rest of logic is in onAlbumSelectionComplete
  showAlbumDropdown(
    msg,
    interaction,
    (albumData, interaction) => {
      onAlbumSelectionComplete(albumData, interaction, channelSubData.isSubscribed);
    },
    linkedAlbum,
  );
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
