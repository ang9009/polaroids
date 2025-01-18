import { useQuery } from "@tanstack/react-query";
import { getMediaFiles } from "../services/getMedia";

/**
 * Represents the cursor object used for pagination.
 */
export interface FetchMediaCursor {
  discordId: string;
  createdAt: Date;
}

/**
 * Fetches paginated media based on the given parameters.
 * @param {FetchMediaCursor} cursor  the cursor object used for pagination
 * @param {string} cursor.discordId the discord id of the last attachment that was fetched
 * @param {Date} cursor.createdAt the time when the last attachment was created
 * @param {string | undefined} query an optional query
 * @returns {object} the desired media, loading state, and error
 */
export const useGetMedia = (cursor: FetchMediaCursor, query?: string) => {
  const { discordId, createdAt } = cursor;
  const { isPending, error, data } = useQuery({
    queryKey: ["media", { query, cursor: { discordId, createdAt } }],
    // eslint-disable-next-line jsdoc/require-jsdoc
    queryFn: ({ queryKey }) => {
      const [contents] = queryKey;
      if (typeof contents === "string") {
        return getMediaFiles(cursor, query);
      } else {
        const { query, cursor } = contents;
        return getMediaFiles(cursor, query);
      }
    },
  });

  return { isPending, error, data };
};
