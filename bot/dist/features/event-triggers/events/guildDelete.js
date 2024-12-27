import { Events } from "discord.js";
import { deleteGuildFromDb } from "../api/deleteGuildFromDb";
const guildDelete = {
    event: Events.GuildDelete,
    once: false,
    async execute(guild) {
        await deleteGuildFromDb(guild.id);
    },
};
export default guildDelete;
//# sourceMappingURL=guildDelete.js.map