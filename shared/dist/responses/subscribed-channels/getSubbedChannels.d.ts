import { z } from "zod";
export declare const GetSubbedChannelsResponseSchema: z.ZodArray<z.ZodObject<{
    channelId: z.ZodString;
    album: z.ZodObject<{
        albumName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        albumName: string;
    }, {
        albumName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    channelId: string;
    album: {
        albumName: string;
    };
}, {
    channelId: string;
    album: {
        albumName: string;
    };
}>, "many">;
export type GetSubbedChannelsResponse = z.infer<typeof GetSubbedChannelsResponseSchema>;
