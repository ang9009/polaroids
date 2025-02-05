import { z } from "zod";

export const GetFoldersRequestSchema = z.object({
  albumId: z.string(),
  parentFolderId: z.string(),
});
