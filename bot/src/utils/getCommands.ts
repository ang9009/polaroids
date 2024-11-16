import fs from "fs";
import path from "path";
import { CommandData } from "../types/commandData.js";
import { getDirname } from "./getDirname.js";

const __dirname = getDirname(import.meta.url);

/**
 * Gets all the commands from the commands folder in each feature folder, and returns a
 * list of CommandData objects.
 * @returns a list of CommandData objects
 */
export const getCommands = async (): Promise<CommandData[]> => {
  const featuresPath = path.join(__dirname, "../features");
  const commandFilePaths = fs.readdirSync(featuresPath).reduce<string[]>((acc, curr) => {
    // Get the events folder path for the current feature
    const commandsFolderPath = path.join(featuresPath, curr, "commands");
    const commandsFolderFiles = fs.readdirSync(commandsFolderPath);
    // Add the folder path prefix
    const eventsFolderFilePaths = commandsFolderFiles.map((file) => {
      return path.join(commandsFolderPath, file);
    });
    // Concatenate the list of events to the result
    return acc.concat(eventsFolderFilePaths);
  }, []);
  const commands: CommandData[] = [];

  for (const filePath of commandFilePaths) {
    const commandFile = await import(filePath);
    const command: CommandData = commandFile.default;
    if (!command) {
      throw new Error("Could not find default export in " + commandFile.toString());
    }
    commands.push(command);
  }

  return commands;
};
