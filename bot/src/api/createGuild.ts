import axios, { AxiosError } from "axios";
import "dotenv/config";
import { DbApiRoutes } from "../types/api/DbApiRoutes";
import getDbApiUrl from "../utils/getDbApiUrl";

/**
 * Updates the database with the guild id corresponding to a guild that the bot was added to.
 * @param guildId the guild's id
 */
const createGuild = async (guildId: string) => {
  const url = getDbApiUrl(DbApiRoutes.GUILD);

  await axios
    .post(url, {
      guildId: guildId,
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
    });
};

export default createGuild;
