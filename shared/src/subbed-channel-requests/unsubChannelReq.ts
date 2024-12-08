import { z } from "zod";

export const UnsubChannelReqSchema = z.object({
  channelId: z.string(),
});
