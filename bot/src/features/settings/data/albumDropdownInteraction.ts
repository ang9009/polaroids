import { ButtonInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";

export type AlbumDropdownInteraction = ButtonInteraction<CacheType> | ChatInputCommandInteraction;
