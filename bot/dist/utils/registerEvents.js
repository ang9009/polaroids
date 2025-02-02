import fs from "fs";
import path from "path";
import { getDirname } from "./getDirname.js";
const __dirname = getDirname(import.meta.url);
/**
 * Registers all events from the events folder to the bot. Note that this function
 * mutates the client object that is passed into it.
 * @param client the Discord API client object being used
 */
export const registerEvents = async (client) => {
    // Retrieve all events files from events folder
    const featuresPath = path.join(__dirname, "../features");
    const eventFilePaths = fs.readdirSync(featuresPath).reduce((acc, curr) => {
        // Get the events folder path for the current feature
        const eventsFolderPath = path.join(featuresPath, curr, "events");
        if (!fs.existsSync(eventsFolderPath)) {
            return acc;
        }
        const eventsFolderContents = fs.readdirSync(eventsFolderPath);
        // Add the folder path prefix
        const eventsFolderContentsPaths = eventsFolderContents.map((file) => {
            return path.join(eventsFolderPath, file);
        });
        return acc.concat(eventsFolderContentsPaths);
    }, []);
    // Attach events as listeners on the client
    for (const filePath of eventFilePaths) {
        const eventFile = await import(filePath);
        const eventData = eventFile.default;
        if (!eventData) {
            console.error("registerEvents could not find a default export in " + filePath);
            continue;
        }
        if (eventData.once) {
            client.once(eventData.event.toString(), (...args) => eventData.execute(...args));
        }
        else {
            client.on(eventData.event.toString(), (...args) => eventData.execute(...args));
        }
    }
};
//# sourceMappingURL=registerEvents.js.map