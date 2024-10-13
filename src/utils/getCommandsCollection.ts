import { Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { Command } from "../@types/discord.js";
import getDirname from "./getDirname.js";

const __dirname = getDirname(import.meta.url);
const foldersPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(foldersPath);

/**
 * Gets all the commands from the commands folder, and returns a Collection
 * of command names mapped to their corresponding Command objects.
 * @returns a Collection of command names and Command objects.
 */
const getCommandsCollection = async (): Promise<
  Collection<string, Command>
> => {
  const commands: Collection<string, Command> = new Collection();

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file: String) => file.endsWith(".ts"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      let command = await import(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ("data" in command && "execute" in command) {
        const cmd = command as Command;
        commands.set(cmd.data.name, cmd);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  return commands;
};

export default getCommandsCollection;
