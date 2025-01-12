import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { apiClient } from "../../../lib/axios";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Deletes the given guild id from the database.
 * @param guildId the guild id to be deleted
 */
export const deleteGuildFromDb = async (guildId: string) => {
  const url = getDbApiUrl(DbApiRoutes.GUILDS);

  try {
    await apiClient.delete(`${url}/${guildId}`);
  } catch (err) {
    console.error("Failed to delete guildId: " + err);
  }
};
