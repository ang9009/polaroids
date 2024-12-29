import { z } from "zod";
export declare const CreateAndLinkAlbumRequestSchema: z.ZodObject<z.objectUtil.extendShape<{
    albumName: z.ZodString;
    albumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, {
    guildId: z.ZodString;
    channelId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    albumName: string;
    guildId: string;
    channelId: string;
    albumDesc?: string | undefined;
}, {
    albumName: string;
    guildId: string;
    channelId: string;
    albumDesc?: unknown;
}>;
export type CreateAndLinkAlbumRequest = z.infer<typeof CreateAndLinkAlbumRequestSchema>;
