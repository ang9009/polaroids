import { GetAlbumsResponse, GetAlbumsResponseSchema } from "shared/src/responses/albums/getAlbums";
import { apiClient } from "../lib/axios";

/**
 * Retrieves data about all albums, including their album covers (the latest
 * file uploaded to the album).
 * @returns {GetAlbumsResponse} a list of all albums and information about their thumbnail
 */
export const getAlbumsData = async (): Promise<GetAlbumsResponse> => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/albums`;
  const res = await apiClient.get(url);

  const parseRes = GetAlbumsResponseSchema.safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Unexpected response when fetching album data: " + res.data);
  }
  return parseRes.data;
};
