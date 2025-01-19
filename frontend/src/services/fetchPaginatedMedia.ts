import axios, { CancelToken, CancelTokenStatic } from "axios";
import { DownloadFileRequest } from "shared/src/requests/files/downloadFile";
import {
  GetFilesDataResponse,
  GetFilesDataResponseSchema,
} from "shared/src/responses/files/getFilesData";
import z from "zod";
import { FetchMediaCursor } from "../hooks/useGetMedia";
import { apiClient } from "../lib/axios";

/**
 * Fetches media files based on the given list of parameters.
 * @param {number} pageSize the number of items to be retrieved
 * @param {CancelToken} cancelToken a token used to cancel the
 * request if needed
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {string} query a search query for file names
 * @param {string} albumId corresponds to the album the files should be in
 * @returns {Blob[]} the requested media
 */
export const fetchPaginatedMedia = async (
  pageSize: number,
  cancelToken: CancelToken,
  cursor?: FetchMediaCursor,
  query?: string,
  albumId?: string,
) => {
  const mediaData = (await fetchPaginatedMediaData(pageSize, cancelToken, cursor, query, albumId))
    .data;
  const mediaFilePromises = mediaData.map((data) =>
    downloadMediaFile(data.discordId, data.extension, cancelToken),
  );
  const mediaFiles = await Promise.all(mediaFilePromises);
  return mediaFiles;
};

/**
 * Downloads a media file that matches the given parameters.
 * @param {string} discordId the file's Discord attachment id
 * @param {string} extension the file's extension
 * @param {CancelTokenStatic} cancelToken a token used to cancel the
 * request if needed
 * @returns {Promise<Blob>} the requested file
 */
const downloadMediaFile = async (
  discordId: string,
  extension: string,
  cancelToken: CancelToken,
): Promise<Blob> => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/files/download`;
  const params = new URLSearchParams(<DownloadFileRequest>{
    discordId: discordId,
    extension: extension,
  });
  const res = await apiClient.get(url, { params, cancelToken, responseType: "blob" });

  const parseRes = z.instanceof(Blob).safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Got unexpected response while fetching media: " + parseRes.error);
  }
  return parseRes.data;
};

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
const fetchPaginatedMediaData = async (
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
