import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";

export type DropdownInteraction = ButtonInteraction<CacheType> | ChatInputCommandInteraction;
