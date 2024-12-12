import { z } from "zod";

export const GetFilesResponseSchema = z.object({
  filesUploaded: z.number(),
});

export type GetFilesResponse = z.infer<typeof GetFilesResponseSchema>;
