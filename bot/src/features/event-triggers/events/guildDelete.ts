import { Events, Guild } from "discord.js";
import { EventData } from "../../../types/eventData";
import { deleteGuildFromDb } from "../api/deleteGuildFromDb";

const guildDelete: EventData<Guild> = {
  event: Events.GuildDelete,
  once: false,
  async execute(guild: Guild) {
    await deleteGuildFromDb(guild.id);
  },
};

export default guildDelete;
