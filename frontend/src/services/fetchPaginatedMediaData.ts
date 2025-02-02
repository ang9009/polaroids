import { CancelToken } from "axios";
import {
  GetFilesDataResponse,
  GetFilesDataResponseSchema,
} from "shared/src/responses/files/getFilesData";
import { FetchMediaCursor } from "../hooks/useGetMediaThumbnails";
import { apiClient } from "../lib/axios";

/**
 * Fetches media data based on the given list of parameters.
 * @param {number} pageSize the number of items to be retrieved
 * @param {CancelTokenStatic} cancelToken a token used to cancel the
 * request if needed
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {string} query an optional query
 * @param {string} albumId the id of the album the files should be from
 * @returns {Promise<GetFilesDataResponse>} the desired file data
 */
export const fetchPaginatedMediaData = async (
  pageSize: number,
  cancelToken: CancelToken,
  cursor?: FetchMediaCursor,
  query?: string,
  albumId?: string,
): Promise<GetFilesDataResponse> => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/files/data`;
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    ...(cursor && {
      "cursor[discordId]": cursor.discordId,
      "cursor[createdAt]": cursor.createdAt.toISOString(),
    }),
    ...(query && { query }),
    ...(albumId && { albumId }),
  });

  const res = await apiClient.get(url, { params, cancelToken });
  const parseRes = GetFilesDataResponseSchema.safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Got unexpected response: " + res);
  }
  return parseRes.data;
};
