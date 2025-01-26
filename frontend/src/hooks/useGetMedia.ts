/* eslint-disable jsdoc/require-jsdoc */
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchPaginatedThumbnailUrls } from "../services/fetchPaginatedThumbnails";

/**
 * Represents the cursor object used for pagination.
 */
export interface FetchMediaCursor {
  discordId: string;
  createdAt: Date;
}

interface MediaPage {
  mediaUrls: string[];
  nextCursor?: FetchMediaCursor;
}

type GetMediaQueryKey = ["mediaThumbnails", { query: string | undefined }];

/**
 * Fetches paginated media based on the given parameters.
 * @param {number} pageSize the number of items to be retrieved
 * @param {string} query a search query for file names
 * @param {string} albumId corresponds to the album the files should be in
 * @returns {object} the desired media, loading state, and error
 */
export const useGetMedia = (pageSize: number, query?: string, albumId?: string) => {
  const queryKey: GetMediaQueryKey = ["mediaThumbnails", { query }];
  const res = useInfiniteQuery<
    MediaPage,
    Error,
    InfiniteData<MediaPage, unknown>,
    GetMediaQueryKey,
    FetchMediaCursor | undefined
  >({
    initialPageParam: undefined,
    retry: false,
    staleTime: 1000 * 60 * 60,
    queryKey,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    queryFn: ({ queryKey, signal, pageParam }) => {
      return fetchPage(pageSize, queryKey, signal, pageParam, albumId);
    },
  });

  return res;
};

const fetchPage = async (
  pageSize: number,
  queryKey: GetMediaQueryKey,
  signal: AbortSignal,
  pageParam: FetchMediaCursor | undefined,
  albumId?: string,
): Promise<MediaPage> => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const { query } = queryKey[1];

  const { data: mediaUrls, cursor: nextCursor } = await fetchPaginatedThumbnailUrls(
    pageSize,
    source.token,
    pageParam,
    query,
    albumId,
  );

  signal?.addEventListener("abort", () => {
    source.cancel("Get media query aborted");
  });

  return {
    mediaUrls,
    nextCursor,
  };
};
