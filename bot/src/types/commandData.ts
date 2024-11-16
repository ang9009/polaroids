import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface CommandData {
  data: SlashCommandBuilder;
  interaction: ChatInputCommandInteraction;
}
