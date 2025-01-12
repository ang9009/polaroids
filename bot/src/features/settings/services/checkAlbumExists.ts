import { isAxiosError } from "axios";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { apiClient } from "../../../lib/axios";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Checks if the given album exists.
 * @param albumName the name of the album
 * @returns a boolean that represents whether the album exists
 */
export const checkAlbumExists = async (albumName: string): Promise<boolean> => {
  const url = getDbApiUrl(DbApiRoutes.ALBUMS, "album-exists", `${albumName}`);
  const headers = {
    Authorization: `ApiKey ${process.env.BOT_API_KEY}`,
  };
  try {
    await apiClient.head(url, { headers });
  } catch (err) {
    if (isAxiosError(err) && err.status === 404) {
      return false;
    } else {
      // Unknown error
      throw Error("albumExists Axios request failed: " + err);
    }
  }

  return true;
};
