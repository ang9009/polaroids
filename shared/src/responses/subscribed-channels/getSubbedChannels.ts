import { z } from "zod";

export const GetSubbedChannelsResponseSchema = z.array(
  z.object({
    channelId: z.string(),
    album: z.object({
      name: z.string(),
    }),
  })
);

export type GetSubbedChannelsResponse = z.infer<typeof GetSubbedChannelsResponseSchema>;
