import { CacheType, Collection, Interaction, SlashCommandBuilder } from "discord.js";

/**
 * Adds a new "commands" property to the Client interface, which stores a
 * collection of the commands for the bot. The key is the name of the command,
 * and the value is the command itself.
 */
declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

/**
 * A command that can be executed by a user, which the bot will respond to.
 */
interface Command {
  // The callback function that will be called when the user invokes the
  // command
  execute: (interaction: Interaction<CacheType>) => void;
  // Holds data about a command, including its name (see discord.js documentation)
  data: SlashCommandBuilder;
}
