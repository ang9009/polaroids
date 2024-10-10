import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { execute } from "./commands/utility/goat.js";
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName == "goat") {
    try {
      await execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
    return;
  }
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map
