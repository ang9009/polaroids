import { isAxiosError } from "axios";
import {
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { IsSubscribedResponse } from "shared/src/responses/subbed-channels-responses/isSubscribedResponse";
import { getChannelSubData } from "../../../api/getChannelSubData";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { filterForNotUploadedFiles } from "../../event-triggers/api/filterForNotUploadedFiles";
import { FileData } from "../../event-triggers/types/fileData";
import { getChannelFilesData } from "../../utility/helpers/getChannelAttachments";
import { getLatestMsg } from "../../utility/helpers/getLatestMsg";
import { checkAlbumExists } from "../api/checkAlbumExists";
import { createAlbumAndLinkChannel } from "../api/createAlbumAndLinkChannel";
import { setChannelAlbum } from "../api/setChannelAlbum";
import { subscribeChannelAndSetAlbum } from "../api/subscribeChannelAndSetAlbum";
import { subscribeChannelWithNewAlbum } from "../api/subscribeChannelWithNewAlbum.ts";
import { AlbumSelectionType } from "../data/albumSelectionType";
import { AlbumSelectionData } from "../data/finalAlbumSelection";
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
  await interaction.reply(`Successfully linked channel to album **${albumData.albumName}**.`);

  // Look through channel history and upload previously uploaded messages
  // ! Refactor into new function and add option (prompt user if they want ot backup)
  await interaction.followUp("Processing channel history...");
  // ! The code below shoule be xtracted into a helpe rmethjod, since backup
  // ! also uses this logic
  const channel = interaction.channel;
  if (!channel) {
    const errEmbed = getErrorEmbed("Could not find this channel. Backup failed.");
    interaction.followUp({ content: "", embeds: [errEmbed] });
    return;
  }
  const latestMsg = await getLatestMsg(channel);
  const filesData: FileData[] = await getChannelFilesData(latestMsg, channel);
  if (filesData.length === 0) {
    await interaction.followUp("No previously uploaded attachments were found.");
    return;
  }

  let notUploadedFilesData: FileData[];
  try {
    notUploadedFilesData = await filterForNotUploadedFiles(filesData);
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`Failed to check for not uploaded files in subscribe function: ${err.message}`);
    }
    const errEmbed = getErrorEmbed("Something went wrong. Please try again.");
    interaction.followUp({ content: "", embeds: [errEmbed] });
    return;
  }
  if (notUploadedFilesData.length === 0) {
    // ! Do something
  }
  // const updateReply = await interaction.followUp(`${filesData.length} file(s) found. Uploading...`);

  // let uploadedFileCount: number;
  // try {
  //   uploadedFileCount = await uploadFiles(filesData, albumData.albumName, false);
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // } catch (err) {
  //   const errEmbed = getErrorEmbed("Backup failed. Please try again.");
  //   updateReply.edit({ content: "", embeds: [errEmbed] });
  //   return;
  // }

  // let uploadConfirmMsg: string;
  // if (uploadedFileCount === 0) {
  //   uploadConfirmMsg = "All of the attachments sent in this channel have already been archived!";
  // } else if (uploadedFileCount < filesData.length) {
  //   uploadConfirmMsg =
  //     "It looks like some attachments sent in this channel have already been archived." +
  //     ` ${uploadedFileCount} attachment(s) were successfully uploaded.`;
  // } else {
  //   uploadConfirmMsg = `Successfully uploaded ${uploadedFileCount} attachment(s).`;
  // }
  // await updateReply.edit({ content: uploadConfirmMsg });
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
