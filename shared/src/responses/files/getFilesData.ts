import { z } from "zod";

export const GetFilesDataResponseSchema = z.object({
  data: z.array(
    z.object({
      discordId: z.string(),
      fileName: z.string(),
      extension: z.string(),
      createdAt: z.string().datetime(),
    })
  ),
});

export type GetFilesDataResponse = z.infer<typeof GetFilesDataResponseSchema>;
