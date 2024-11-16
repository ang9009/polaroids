import "discord.js";
import { CommandData } from "./commandData";

/**
 * Adds a new "commands" property to the Client interface, which stores a
 * collection of the commands for the bot. The key is the name of the command,
 * and the value is the command itself.
 */
declare module "discord.js" {
  export interface Client {
    commands: CommandData[];
  }
}
