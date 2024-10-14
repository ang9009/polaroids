import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import getCommandsCollection from "./utils/getCommandsCollection.js";
import handleInteractions from "./utils/handleInteractions.js";
import registerEvents from "./utils/registerEvents.js";

// TODO: Check features doc

// Initialize client and client.commands collection
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = await getCommandsCollection();

// Handle commands
client.on(Events.InteractionCreate, (interaction) =>
  handleInteractions(interaction)
);

// Register all events
await registerEvents(client);

await client.once(Events.ClientReady, (readyClient: Client) => {
  if (readyClient.user) {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
});

client.login(process.env.TOKEN);
