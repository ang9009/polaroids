import axios, { AxiosError } from "axios";
import "dotenv/config";
import DbErrorCode from "shared/error-codes/DbErrorCode";
import { isDbExceptionResponse } from "shared/error-responses/dbExceptionResponse";
import { DbApiRoutes } from "../types/api/DbApiRoutes";
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
    console.log(err);
    if (!(err instanceof AxiosError)) {
      throw new Error("An unknown error occurred. Please contact the developer.");
    }

    if (!err.response) {
      throw new Error("Could not reach server.");
    }

    const data = err.response.data;
    if (
      isDbExceptionResponse(data) &&
      data.dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION
    ) {
      throw new Error(
        "Polaroids was previously added to this server. An existing album will be used.",
      );
    }

    throw new Error("Something went wrong while making a request to the database.");
  }
};

export { addGuildToDb };
