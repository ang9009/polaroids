import axios from "axios";
import "dotenv/config";

import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { genericErrorResult } from "../../../data/genericErrorResult";
import { Result } from "../../../types/result";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";

/**
 * Updates the database with the guild id corresponding to a guild that the bot
 * was added to.
 * @param guildId the guild's id
 * @returns an appropriate Result object
 */
export const addGuildToDb = async (guildId: string): Promise<Result<void>> => {
  const url = getDbApiUrl(DbApiRoutes.GUILDS);

  try {
    await axios.post(url, { guildId });
  } catch (err) {
    if (!isAxiosErrorResponse(err)) {
      console.trace("An unknown error occurred while making an Axios request: " + err);
      return genericErrorResult;
    }
    const errorData = err.response.data;
    if (!isDbExceptionResponse(errorData)) {
      console.trace("An unknown error occurred while making a request to the database: " + err);
      return genericErrorResult;
    }
  }

  return { success: true, data: undefined };
};
