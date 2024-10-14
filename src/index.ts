import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { LocalStorage } from "node-localstorage";
import updateSessionId from "./api/updateSessionId.js";
import getCommandsCollection from "./utils/getCommandsCollection.js";
import handleInteractions from "./utils/handleInteractions.js";
import registerEvents from "./utils/registerEvents.js";

// Set up local storage for session id, then update session id
global.localStorage = new LocalStorage("./session_id");
await updateSessionId();

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
