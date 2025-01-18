import { z } from "zod";

export const GetFilesDataResponseSchema = z.object({
  data: z.array(
    z.object({
      discordId: z.string(),
      extension: z.string(),
    })
  ),
});

export type GetFilesDataResponse = z.infer<typeof GetFilesDataResponseSchema>;
