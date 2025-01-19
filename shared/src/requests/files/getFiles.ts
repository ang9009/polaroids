import { z } from "zod";
import { GetFilesCursorSchema } from "./cursor";

export const GetFilesRequestSchema = z.object({
  cursor: GetFilesCursorSchema.optional(),
  searchQuery: z.string().optional(),
  albumId: z.string().optional(),
  pageSize: z.coerce.number(),
});

export type GetFilesRequest = z.infer<typeof GetFilesRequestSchema>;
