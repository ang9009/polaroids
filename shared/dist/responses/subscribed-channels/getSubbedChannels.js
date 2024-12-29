import { z } from "zod";
export const GetSubbedChannelsResponseSchema = z.array(z.object({
    channelId: z.string(),
    album: z.object({
        albumName: z.string(),
    }),
}));
//# sourceMappingURL=getSubbedChannels.js.map