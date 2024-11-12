import axios from "axios";
import "dotenv/config";
import DbErrorCode from "shared/error-codes/DbErrorCode";
import { DbApiRoutes } from "../types/api/DbApiRoutes";
import { ensureAxiosErrorResponse } from "../utils/ensureAxiosErrorResponse";
import { ensureDbExceptionResponse } from "../utils/ensureDbException";
import getDbApiUrl from "../utils/getDbApiUrl";

/**
 * Updates the database with the guild id corresponding to a guild that the bot
 * was added to.
 * @param guildId the guild's id
 */
const addGuildToDb = async (guildId: string) => {
  const url = getDbApiUrl(DbApiRoutes.GUILD);

  try {
    await axios.post(url, { guildId });
  } catch (err) {
    const error = ensureAxiosErrorResponse(err);

    const errorData = error.response.data;
    const dbError = ensureDbExceptionResponse(errorData);
    if (dbError.dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
      throw new Error(
        "It looks like polaroids was previously added to this server. Existing settings will be used.",
      );
    }
    throw new Error("Something went wrong while making a request to the database.");
  }
};

export { addGuildToDb };
