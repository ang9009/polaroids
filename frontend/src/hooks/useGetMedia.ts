import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchPaginatedMedia } from "../services/fetchPaginatedMedia";

/**
 * Represents the cursor object used for pagination.
 */
export interface FetchMediaCursor {
  discordId: string;
  createdAt: Date;
}

/**
 * Fetches paginated media based on the given parameters.
 * @param {number} pageSize the number of items to be retrieved
 * @param {FetchMediaCursor} cursor the cursor used to paginate the media
 * @param {string} query a search query for file names
 * @param {string} albumId corresponds to the album the files should be in
 * @returns {object} the desired media, loading state, and error
 */
export const useGetMedia = (
  pageSize: number,
  cursor?: FetchMediaCursor,
  query?: string,
  albumId?: string,
) => {
  // !Use infinite query
  const { isPending, error, data } = useQuery({
    queryKey: ["media", { cursor, query }],
    retry: false,
    staleTime: 1000 * 60 * 60,
    // eslint-disable-next-line jsdoc/require-jsdoc
    queryFn: ({ queryKey, signal }) => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const [contents] = queryKey;

      let res: Promise<Blob[]>;
      if (typeof contents === "string") {
        res = fetchPaginatedMedia(pageSize, source.token, undefined, query, albumId);
      } else {
        const { cursor, query } = contents;
        res = fetchPaginatedMedia(pageSize, source.token, cursor, query, albumId);
      }

      signal?.addEventListener("abort", () => {
        source.cancel("Get media query aborted");
      });

      return res;
    },
  });

  return { isPending, error, data };
};
