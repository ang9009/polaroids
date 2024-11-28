import axios from "axios";
import { AlbumExistsResponseSchema } from "shared/album-responses/albumExistsResponse";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

export const checkAlbumExists = async (albumName: string): Promise<boolean> => {
  const url = getDbApiUrl(DbApiRoutes.ALBUMS, "/album-exists", `/${albumName}`);
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    throw Error("albumExists Axios request failed: " + err);
  }

  const parsedRes = AlbumExistsResponseSchema.safeParse(res);
  if (!parsedRes.success) {
    throw Error("Got unexpected response from albumExists request");
  }
  return parsedRes.data.albumExists;
};
