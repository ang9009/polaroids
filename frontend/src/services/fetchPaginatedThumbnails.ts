import { CancelToken } from "axios";
import { getMimetypeFromExtension } from "shared/src/helpers/getMimetypeFromExtension";
import { FetchMediaCursor } from "../hooks/useGetMedia";
import { fetchPaginatedMediaData } from "./fetchPaginatedMediaData";
import { getFile } from "./getFile";

/**
 * Fetches thumbnails for photos/videos based on the given list of parameters.
 * @param {number} pageSize the number of items to be retrieved
 * @param {CancelToken} cancelToken a token used to cancel the
 * request if needed
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {string} query a search query for file names
 * @param {string} albumId corresponds to the album the files should be in
 * @returns {Blob[]} the requested media
 */
export const fetchPaginatedThumbnails = async (
  pageSize: number,
  cancelToken: CancelToken,
  cursor?: FetchMediaCursor,
  query?: string,
  albumId?: string,
): Promise<{ data: Blob[]; cursor: FetchMediaCursor | undefined }> => {
  const { data: mediaData } = await fetchPaginatedMediaData(
    pageSize,
    cancelToken,
    cursor,
    query,
    albumId,
  );
  const mediaFilePromises = mediaData.map((data) => {
    const mimetype = getMimetypeFromExtension(data.extension);
    return getFile(data.discordId, mimetype, true, cancelToken);
  });
  const mediaFiles = await Promise.all(mediaFilePromises);

  const { discordId: cursorDiscordId, createdAt: cursorCreatedAt } =
    mediaData[mediaData.length - 1];
  const newCursor: FetchMediaCursor | undefined =
    mediaData.length !== 0
      ? {
          discordId: cursorDiscordId,
          createdAt: new Date(cursorCreatedAt),
        }
      : undefined;

  return { data: mediaFiles, cursor: newCursor };
};
