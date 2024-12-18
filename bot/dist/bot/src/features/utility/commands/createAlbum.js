import { SlashCommandBuilder } from "discord.js";
import { replyWithErrorEmbed } from "../../../utils/replyWithErrorEmbed";
import { createAlbum } from "../api/createAlbum";
/**
 * Creates a new album with the given name and description.
 */
const data = new SlashCommandBuilder()
    .setName("album")
    .setDescription("Create, edit (an album's name/desc), or delete an album")
    .addSubcommand((subCmd) => subCmd.setName("create").setDescription("Create a new album"))
    .addSubcommand((subCmd) => subCmd.setName("edit").setDescription("Edit an album's name/description"))
    .addSubcommand((subCmd) => subCmd.setName("delete").setDescription("Delete an empty album"));
/**
 * The execute function for the createAlbum command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const albumName = interaction.options.getString("name");
    const albumDesc = interaction.options.getString("description");
    if (!albumName) {
        throw Error("Album name was somehow null even though it is required");
    }
    try {
        await createAlbum(albumName, albumDesc);
    }
    catch (err) {
        if (err instanceof Error) {
            replyWithErrorEmbed(interaction, err.message);
        }
        else {
            replyWithErrorEmbed(interaction, "Something went wrong. Please try again.");
        }
        return;
    }
    await interaction.reply(`Successfully created album **${albumName}**.`);
};
const commandData = {
    data,
    execute,
};
export default commandData;
//# sourceMappingURL=createAlbum.js.map