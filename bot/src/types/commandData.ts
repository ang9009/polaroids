import { ChatInputCommandInteraction, SharedSlashCommand } from "discord.js";

export interface CommandData {
  data: SharedSlashCommand;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
