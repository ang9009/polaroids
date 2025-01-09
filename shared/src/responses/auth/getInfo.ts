import { z } from "zod";

export const GetInfoResponseSchema = z.object({
  avatar: z.string(),
  username: z.string(),
});

export type GetInfoResponse = z.infer<typeof GetInfoResponseSchema>;
