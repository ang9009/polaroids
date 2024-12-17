import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandData } from "../../../types/commandData";

/**
 * A command that lists all available commands.
 */
const data = new SlashCommandBuilder().setName("help").setDescription("List available commands");

/**
 * The execute function for the help command.
 * @param interaction the interaction triggered by invoking the command
 */
const execute = async (interaction: ChatInputCommandInteraction) => {
  const embedDesc =
    "- `/subscribe`: ask polaroids to upload any attachments sent in a channel, or change the album that a subscribed channel is linked to\n" +
    "- `/unsubscribe`: unsubscribe polaroids from changes in a channel\n" +
    "- `/createalbum <album_name> <album_desc>`: create a new album\n" +
    "- `/listalbums`: list all existing albums\n" +
    "- `/backup`: find and upload all unarchived attachments in a channel\n" +
    "- `/upload <message_id>`: upload files attached to a specified message\n" +
    "- `/website`: get a link to the polaroids site\n" +
    "- `/help`: list available commands";

  const helpEmbed = new EmbedBuilder()
    .setTitle("polaroids commands")
    .setDescription(embedDesc)
    .setFooter({
      text: "📸 polaroids v1.0 | by dalfie",
    });
  interaction.reply({ embeds: [helpEmbed] });
};

const commandData: CommandData = {
  data,
  execute,
};

export default commandData;
