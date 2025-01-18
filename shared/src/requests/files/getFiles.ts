import { z } from "zod";

export const GetFilesRequestSchema = z.object({
  cursor: z
    .object({
      discordId: z.string(),
      createdAt: z.coerce.string().datetime({ message: "String must be formatted in ISO8601" }),
    })
    .optional(),
  searchQuery: z.string().optional(),
  pageSize: z.coerce.number(),
});

/**
 * Checks if the provided datetime string is formatted in ISO8601.
 * @param date the date in question
 * @returns whether the string is formatted correctly
 */
function isIsoDate(date: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) return false;
  const d = new Date(date);
  return !isNaN(d.getTime()) && d.toISOString() === date; // valid date
}

export type GetFilesRequest = z.infer<typeof GetFilesRequestSchema>;
