import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { CommandData } from "../../../types/commandData";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { uploadAttachmentsWithProgress } from "../../event-triggers/helpers/uploadFilesWithProgress";
import { showAlbumDropdown } from "../../settings/helpers/showAlbumDropdown";

/**
 * Uploads files attached to a specified message (using its message id).
 */
const data = new SlashCommandBuilder()
  .setName("upload")
  .setDescription("Upload files attached to a specified message in the current channel")
  .addStringOption((messageIdOption) =>
    messageIdOption.setName("message_id").setDescription("The message's id").setRequired(true),
  );

/**
 * The execute function for the upload command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const messageId = interaction.options.getString("message_id", true);
  const channel = interaction.channel;
  if (!channel) {
    throw Error("Could not find channel");
  }

  let msg: Message<boolean>;
  try {
    msg = await channel.messages.fetch(messageId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    replyWithErrorEmbed(
      interaction,
      `Could not find the specified message with id "${messageId}". Please try again.`,
    );
    return;
  }

  const { attachments } = msg;
  if (attachments.size === 0) {
    replyWithErrorEmbed(
      interaction,
      `The specified message with id "${messageId}" has no attachments. Please try again.`,
    );
    return;
  }

  const dropdownSelectionRes = await showAlbumDropdown(
    "Please select the album that the attachments will be uploaded to.",
    interaction,
    undefined,
    true,
  );
  if (dropdownSelectionRes === undefined) {
    return;
  }

  const { selectedAlbum, dropdownInteraction } = dropdownSelectionRes;
  await dropdownInteraction.deferUpdate();

  const { albumName } = selectedAlbum;
  await uploadAttachmentsWithProgress(msg, albumName);
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
