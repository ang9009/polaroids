import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CommandData {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
