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
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".ts"));
    // Attach events as listeners on the client
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventFile = await import(filePath);
        const event = eventFile.default;
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};
//# sourceMappingURL=registerEvents.js.map