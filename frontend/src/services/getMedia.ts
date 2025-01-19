import { GetFilesRequestSchema } from "shared/src/requests/files/getFiles";
import { FetchMediaCursor } from "../hooks/useGetMedia";
import { getAxios } from "../lib/axios";

/**
 * Fetches media files based on the given list of parameters.
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {number} pageSize the number of items to be retrieved
 * @param {string} query an optional query
 */
export const fetchPaginatedMedia = (
  cursor: FetchMediaCursor,
  pageSize: number,
  query?: string,
) => {};

/**
 * Fetches media data based on the given list of parameters.
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {number} pageSize the number of items to be retrieved
 * @param {string} query an optional query
 * @returns the desired file data
 */
const fetchPaginatedMediaData = async (
  cursor: FetchMediaCursor,
  pageSize: number,
  query?: string,
) => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/download-file`;
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    "cursor[discordId]": cursor.discordId,
    "cursor[createdAt]": cursor.createdAt.toISOString(),
  });

  const res = await getAxios(url, params);
  const parseRes = GetFilesRequestSchema.safeParse(res);
  if (!parseRes.success) {
    throw Error("Got unexpected response: " + res);
  }
  return res;
};
