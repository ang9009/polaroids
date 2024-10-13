import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import fs from "fs";
import path from "path";
import getCommandsCollection from "./utils/getCommandsCollection.js";
import getDirname from "./utils/getDirname.js";

// Initialize client and client.commands collection
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = await getCommandsCollection();

const __dirname = getDirname(import.meta.url);

// Handle commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Try to get the command from the commands collection
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
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
});

// Retrieve all events files from events folder
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".ts"));

// Add all the events as listener functions on the client
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const eventFile = await import(filePath);
  const event = eventFile.default;

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// TODO: Refactor the events and commands logic into new files.

client.once(Events.ClientReady, (readyClient: any) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);
