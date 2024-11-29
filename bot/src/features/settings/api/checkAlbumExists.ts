import axios from "axios";
import { AlbumExistsResponseSchema } from "shared/src/album-responses/albumExistsResponse";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Checks if the given album exists.
 * @param albumName the name of the album
 * @returns a boolean that represents whether the album exists
 */
export const checkAlbumExists = async (albumName: string): Promise<boolean> => {
  const url = getDbApiUrl(DbApiRoutes.ALBUMS, "album-exists", `${albumName}`);
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    throw Error("albumExists Axios request failed: " + err);
  }

  const parsedRes = AlbumExistsResponseSchema.safeParse(res.data);
  if (!parsedRes.success) {
    throw Error("Got unexpected response from albumExists request");
  }
  return parsedRes.data.albumExists;
};
