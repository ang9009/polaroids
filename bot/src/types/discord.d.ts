import "discord.js";
import { Collection } from "discord.js";
import { CommandData } from "./commandData";

/**
 * Adds a new "commands" property to the Client interface, which maps command
 * names to the corresponding command's data.
 */
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, CommandData>;
  }
}
