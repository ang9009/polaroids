import { EmbedBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "discord.js";
import { footerCredits } from "../../../data/constants";
import { PrimaryColors } from "../../../data/primaryColors";
import { getAlbums } from "../../settings/api/getAlbumNames";
var ListCommandArgument;
(function (ListCommandArgument) {
    ListCommandArgument["ALBUMS"] = "albums";
    ListCommandArgument["CHANNELS"] = "channels";
})(ListCommandArgument || (ListCommandArgument = {}));
/**
 * Lists all existing albums/subscribed channels in this guild and their associated albums.
 */
const data = new SlashCommandBuilder()
    .setName("list")
    .setDescription("List info about all existing albums, or subscribed channels in this guild.")
    .addSubcommand((input) => input.setName(ListCommandArgument.ALBUMS).setDescription("List info about all existing albums"))
    .addSubcommand((input) => input
    .setName(ListCommandArgument.CHANNELS)
    .setDescription("List info about subscribed channels in this guild"));
/**
 * The execute function for the list command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction) => {
    const optionArg = interaction.options.getSubcommand();
    switch (optionArg) {
        case ListCommandArgument.ALBUMS: {
            await handleListAlbumsInteraction(interaction);
            break;
        }
        case ListCommandArgument.CHANNELS: {
            break;
        }
        default:
            throw Error("Unrecognized subcommand");
    }
};
/**
 * Displays a list of all existing albums with their name and description. If
 * there are no existing albums, an appropriate reply is made.
 * @param interaction the ongoing interaction
 */
const handleListAlbumsInteraction = async (interaction) => {
    const albums = await getAlbums();
    if (albums.length === 0) {
        await interaction.reply("No albums found. To create an album, use the command `/album create`.");
        return;
    }
    //   Construct a list of album names and their descriptions, separated by newlines
    const albumsInfo = albums.map((album, i) => {
        return `${i + 1}. **${album.name}**: ${album.description}`;
    });
    const albumsEmbedBody = albumsInfo.join("\n");
    const albumsEmbed = new EmbedBuilder()
        .setColor(PrimaryColors.PRIMARY_WHITE)
        .setTitle("All albums")
        .setDescription(albumsEmbedBody)
        .setFooter({ text: footerCredits });
    await interaction.reply({ embeds: [albumsEmbed] });
};
const cmdData = {
    data,
    execute,
};
export default cmdData;
//# sourceMappingURL=list.js.map