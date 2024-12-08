import { z } from "zod";

export const UploadFilesReqBodySchema = z.object({
  albumName: z.string(),
  ids: z.array(z.string()).optional(),
});
