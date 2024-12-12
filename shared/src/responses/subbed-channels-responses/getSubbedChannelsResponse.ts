import { z } from "zod";

export const GetSubbedChannelsResponseSchema = z.object({
  channelIds: z.array(z.string()),
});

export type GetSubbedChannelsResponse = z.infer<typeof GetSubbedChannelsResponseSchema>;
