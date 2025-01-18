import { FetchMediaCursor } from "../hooks/useGetMedia";
import { getAxios } from "../lib/axios";

/**
 * Fetches media files based on the given list of parameters.
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {string} query an optional query
 */
export const getMediaFiles = (cursor: FetchMediaCursor, query?: string) => {};

/**
 * Fetches media data based on the given list of parameters.
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param pageSize
 * @param {string} query an optional query
 */
const getMediaData = (cursor: FetchMediaCursor, pageSize: number, query?: string) => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/download-file`;
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    "cursor[discordId]": cursor.discordId,
    "cursor[createdAt]": cursor.createdAt.toISOString(),
  });

  getAxios(url, params);
};
