import { z } from "zod";

export const UploadMediaRequestSchema = z.object({
  albumName: z.string(),
  ids: z.array(z.string()).optional(),
});
