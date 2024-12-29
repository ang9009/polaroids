import { z } from "zod";
export declare const UpdateChannelAlbumRequestSchema: z.ZodObject<{
    guildId: z.ZodString;
    channelId: z.ZodString;
    albumId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumId: string;
    guildId: string;
    channelId: string;
}, {
    albumId: string;
    guildId: string;
    channelId: string;
}>;
export type UpdateChannelAlbumRequest = z.infer<typeof UpdateChannelAlbumRequestSchema>;
