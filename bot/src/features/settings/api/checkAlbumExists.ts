import axios, { isAxiosError } from "axios";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Checks if the given album exists.
 * @param albumName the name of the album
 * @returns a boolean that represents whether the album exists
 */
export const checkAlbumExists = async (albumName: string): Promise<boolean> => {
  const url = getDbApiUrl(DbApiRoutes.ALBUMS, "album-exists", `${albumName}`);
  try {
    await axios.head(url);
  } catch (err) {
    if (isAxiosError(err) && err.status === 404) {
      return false;
    }
    throw Error("albumExists Axios request failed: " + err);
  }

  return true;
};
