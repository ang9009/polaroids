import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { getCommands } from "./utils/getCommands.js";
import { handleCommandInteractions } from "./utils/handleCommandInteractions.js";
import { registerEvents } from "./utils/registerEvents.js";

// Initialize client and client.commands collection
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = await getCommands();

// Handle commands from commands folder
client.on(Events.InteractionCreate, (interaction) => handleCommandInteractions(interaction));

// Register all events from events folder
await registerEvents(client);

await client.once(Events.ClientReady, (readyClient: Client) => {
  if (readyClient.user) {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
});

client.login(process.env.TOKEN);
