import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  StringSelectMenuInteraction,
} from "discord.js";
import { CommandData } from "../../../types/commandData";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { getAlbumModal } from "../../settings/helpers/getAlbumModal";
import { getAlbumModalInputs } from "../../settings/helpers/getAlbumModalInputs";
import { createAlbum } from "../api/createAlbum";
import { deleteAlbum } from "../api/deleteAlbum";
import { editAlbum } from "../api/editAlbum";
import { showAlbumDropdown } from "./../../settings/helpers/showAlbumDropdown";

enum SubCommand {
  CREATE = "create",
  EDIT_INFO = "editinfo",
  DELETE = "delete",
}

const createAlbumSubCmd = new SlashCommandSubcommandBuilder()
  .setName(SubCommand.CREATE)
  .setDescription("Create a new album")
  .addStringOption((nameOption) =>
    nameOption.setName("name").setDescription("The name of the album").setRequired(true),
  )
  .addStringOption((descOption) =>
    descOption.setName("description").setDescription("The album's description").setRequired(false),
  );

const editAlbumSubCmd = new SlashCommandSubcommandBuilder()
  .setName(SubCommand.EDIT_INFO)
  .setDescription("Edit an existing album's name/description");

const deleteAlbumSubCmd = new SlashCommandSubcommandBuilder()
  .setName(SubCommand.DELETE)
  .setDescription("Delete an empty album");

/**
 * Creates a new album with the given name and description.
 */
const data = new SlashCommandBuilder()
  .setName("album")
  .setDescription("Create, edit (an album's name/desc), or delete an album")
  .addSubcommand(createAlbumSubCmd)
  .addSubcommand(editAlbumSubCmd)
  .addSubcommand(deleteAlbumSubCmd);

/**
 * The execute function for the createAlbum command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const subCmd = interaction.options.getSubcommand();

  switch (subCmd) {
    case SubCommand.CREATE: {
      await handleCreateAlbumInteraction(interaction);
      break;
    }
    case SubCommand.EDIT_INFO: {
      await handleEditAlbumInteraction(interaction);
      break;
    }
    case SubCommand.DELETE: {
      await handleDeleteAlbumInteraction(interaction);
      break;
    }
    default:
      throw Error("Unrecognized subcommand");
  }
};

/**
 * Handles the delete album interaction. This presents the user with a dropdown
 * to select the album to be deleted, then deletes the specified album.
 * @param interaction
 */
const handleDeleteAlbumInteraction = async (interaction: ChatInputCommandInteraction) => {
  const { selectedAlbum, dropdownInteraction } = await showAlbumDropdown(
    "Please select the album you would like to delete. Albums with files cannot be deleted.",
    interaction,
    undefined,
    true,
  );
  const { albumName } = selectedAlbum;

  try {
    await deleteAlbum(albumName);
  } catch (err) {
    let errMsg;
    if (err instanceof Error) {
      errMsg = err.message;
    } else {
      errMsg = "An unknown error occurred. Please try again.";
    }
    const errEmbed = getErrorEmbed(errMsg);
    await dropdownInteraction.reply({ embeds: [errEmbed] });
    return;
  }

  await dropdownInteraction.reply(`Successfully deleted album **${albumName}**.`);
};

/**
 * Handles the "edit album" subcommand interaction. This provides the user with
 * a dropdown of albums to select from, then opens a modal where the user can
 * provide the new name and/or description of the selected album.
 * @param interaction the ongoing interaction
 */
const handleEditAlbumInteraction = async (interaction: ChatInputCommandInteraction) => {
  const { selectedAlbum, dropdownInteraction } = await showAlbumDropdown(
    "Please select the album you would like to edit.",
    interaction,
    undefined,
    true,
  );

  const { albumName: originalAlbumName, albumDesc } = selectedAlbum;
  const nameInputId = "albumNameInput";
  const descInputId = "albumDescInput";

  const modal = getAlbumModal(
    "Edit album info",
    nameInputId,
    descInputId,
    originalAlbumName,
    albumDesc,
  );
  if (!(dropdownInteraction instanceof StringSelectMenuInteraction)) {
    throw Error("Unexpected interaction type");
  }
  await dropdownInteraction.showModal(modal);
  const {
    name: newAlbumName,
    description: newAlbumDesc,
    modalInteraction,
  } = await getAlbumModalInputs(dropdownInteraction, nameInputId, descInputId);

  try {
    await editAlbum(originalAlbumName, newAlbumName, newAlbumDesc);
  } catch (err) {
    let errMsg;
    if (err instanceof Error) {
      errMsg = err.message;
    } else {
      errMsg = "Something went wrong. Please try again.";
    }
    const errEmbed = getErrorEmbed(errMsg);
    modalInteraction.reply({ embeds: [errEmbed] });
  }

  const editedAlbumName = originalAlbumName === newAlbumName ? originalAlbumName : newAlbumName;
  modalInteraction.reply(`Successfully edited album **${editedAlbumName}**.`);
};

/**
 * Uses the arguments from the "create album" subcommand interaction to create
 * the album and inform the user of the result.
 * @param interaction the ongoing interaction
 */
const handleCreateAlbumInteraction = async (interaction: ChatInputCommandInteraction) => {
  const albumName = interaction.options.getString("name");
  const albumDesc = interaction.options.getString("description");
  if (!albumName) {
    throw Error("Album name was somehow null even though it is required");
  }

  try {
    await createAlbum(albumName, albumDesc);
  } catch (err) {
    if (err instanceof Error) {
      replyWithErrorEmbed(interaction, err.message);
    } else {
      replyWithErrorEmbed(interaction, "Something went wrong. Please try again.");
    }
    return;
  }

  await interaction.reply(`Successfully created album **${albumName}**.`);
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
