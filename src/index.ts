import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { LocalStorage } from "node-localstorage";
import updateSessionId from "./api/updateSessionId.js";
import getCommandsCollection from "./utils/getCommandsCollection.js";
import handleInteractions from "./utils/handleInteractions.js";
import registerEvents from "./utils/registerEvents.js";

// Set up local storage for session id, then update session id
// ! TODO: check if session ID is valid before performing any API related
// ! actions/updating it
global.localStorage = new LocalStorage("./session_id");
await updateSessionId();
console.log(
  `Successfully retrieved session ID: ${global.localStorage.getItem("sessionId")}`
);

// Initialize client and client.commands collection
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = await getCommandsCollection();

// Handle commands from commands folder
client.on(Events.InteractionCreate, (interaction) =>
  handleInteractions(interaction)
);

// Register all events from events folder
await registerEvents(client);

await client.once(Events.ClientReady, (readyClient: Client) => {
  if (readyClient.user) {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  }
});

client.login(process.env.TOKEN);
