import { Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { getDirname } from "./getDirname.js";
const __dirname = getDirname(import.meta.url);
/**
 * Gets all the commands from the commands folder in each feature folder, and returns a
 * list of CommandData objects.
 * @returns a list of CommandData objects
 */
export const getCommands = async () => {
    const featuresPath = path.join(__dirname, "../features");
    // Get the paths for all the command files
    const commandFilePaths = fs.readdirSync(featuresPath).reduce((acc, curr) => {
        // Get the commands folder path for the current feature
        const commandsFolderPath = path.join(featuresPath, curr, "commands");
        // If the commands folder doesn't exist, skip this feature
        if (!fs.existsSync(commandsFolderPath)) {
            return acc;
        }
        // Get the Dirents for all the commands (commands must be files)
        const commandsFolderFiles = fs.readdirSync(commandsFolderPath, { withFileTypes: true });
        const eventsFolderFilePaths = commandsFolderFiles
            .filter((dirent) => dirent.isFile())
            .map((dirent) => {
            return path.join(dirent.parentPath, dirent.name);
        });
        // Concatenate the list of events to the result
        return acc.concat(eventsFolderFilePaths);
    }, []);
    const commands = new Collection();
    for (const filePath of commandFilePaths) {
        const commandFile = await import(filePath);
        const command = commandFile.default;
        if (!command) {
            console.error("getCommands could not find a default export in " + filePath);
            continue;
        }
        commands.set(command.data.name, command);
    }
    return commands;
};
//# sourceMappingURL=getCommands.js.map