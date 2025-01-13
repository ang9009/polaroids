import { z } from "zod";

export const GetUserInfoResponseSchema = z.object({
  avatar: z.string(),
  username: z.string(),
  id: z.string(),
});

export type GetUserInfoResponse = z.infer<typeof GetUserInfoResponseSchema>;
