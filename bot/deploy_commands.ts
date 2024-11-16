import { REST, Routes } from "discord.js";
import "dotenv/config";
import { getCommands } from "./src/utils/getCommands";

// Mostly taken from the Discord.js guide:
// https://discordjs.guide/creating-your-bot/command-deployment.html#command-registration.

// Run "npm run deploycommands" to run this file.

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

if (!clientId || !guildId || !token) {
  throw new Error("CLIENT_ID, GUILD_ID, or TOKEN has not been initialized in .env");
}

const cmdsData = await getCommands();
// We need to PUT the JSON data of each command, not the command objects
const cmdsJSONData = cmdsData.map((cmdData) => cmdData.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${cmdsJSONData.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: cmdsJSONData,
    });

    console.log(`Successfully reloaded ${cmdsJSONData.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
