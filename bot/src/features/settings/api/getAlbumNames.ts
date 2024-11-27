import axios from "axios";
import { GetAlbumsResponseSchema } from "shared/album-responses/getAlbumsResponse";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { Album } from "./../../../../../db-api/node_modules/.prisma/client/index.d";

/**
 * Gets a list of all of the existing album names.
 * @returns a list of strings representing all of the existing albums' names
 */
export const getAlbums = async (): Promise<Album[]> => {
  const url = getDbApiUrl(DbApiRoutes.ALBUMS);
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    throw Error("getAlbumNames Axios request failed: " + err);
  }
  const parsedRes = GetAlbumsResponseSchema.safeParse(res.data);
  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw Error("Unexpected return type from getAlbumNames request");
  }
};
