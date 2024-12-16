import axios from "axios";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
/**
 * Deletes the given guild id from the database.
 * @param guildId the guild id to be deleted
 */
export const deleteGuildFromDb = async (guildId) => {
    const url = getDbApiUrl(DbApiRoutes.GUILDS);
    try {
        await axios.delete(`${url}/${guildId}`);
    }
    catch (err) {
        console.error("Failed to delete guildId: " + err);
    }
};
//# sourceMappingURL=deleteGuildFromDb.js.map