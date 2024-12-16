import { z } from "zod";

export const UnsubChannelRequestSchema = z.object({
  channelId: z.string(),
});
