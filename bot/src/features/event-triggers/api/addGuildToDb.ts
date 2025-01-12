import "dotenv/config";

import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { apiClient } from "../../../lib/axios";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";

/**
 * Updates the database with the guild id corresponding to a guild that the bot
 * was added to.
 * @param guildId the guild's id
 */
export const addGuildToDb = async (guildId: string) => {
  const url = getDbApiUrl(DbApiRoutes.GUILDS);

  try {
    await apiClient.post(url, { guildId });
  } catch (err) {
    if (!isAxiosErrorResponse(err)) {
      throw Error("An unknown error occurred while making an Axios request: " + err);
    }
    const errorData = err.response.data;
    if (!isDbExceptionResponse(errorData)) {
      throw Error("An unknown error occurred while making a request to the database: " + err);
    }
  }
};
