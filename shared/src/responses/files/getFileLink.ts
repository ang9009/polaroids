import { z } from "zod";

export const GetFileLinkResponseSchema = z.object({
  url: z.string(),
});

export type GetFileLinkResponse = z.infer<typeof GetFileLinkResponseSchema>;
