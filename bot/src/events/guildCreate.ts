import { Guild } from "discord.js";
import createGuild from "../api/createGuild";

module.exports = {
  name: "guildCreate",
  once: false,
  async execute(guild: Guild) {
    const id = guild.id;
    await createGuild(id);
  },
};
