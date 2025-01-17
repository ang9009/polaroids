import { z } from "zod";

export const GetFilesRequestSchema = z.object({
  cursor: z
    .object({
      discordId: z.string(),
      createdAt: z.string().datetime(),
    })
    .optional(),
  searchQuery: z.string().optional(),
  pageSize: z.coerce.number(),
});

export type GetFilesRequest = z.infer<typeof GetFilesRequestSchema>;
