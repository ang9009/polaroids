import { z } from "zod";

export const UploadFilesResponseSchema = z.object({
  filesUploaded: z.number(),
});

export type UploadFilesResponse = z.infer<typeof UploadFilesResponseSchema>;
