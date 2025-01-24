import { z } from "zod";
export declare const CreateAndLinkAlbumRequestSchema: z.ZodObject<{
    albumName: z.ZodString;
    albumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    guildId: z.ZodString;
    channelId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumDesc?: string | undefined;
    albumName: string;
    guildId: string;
    channelId: string;
}, {
    albumDesc?: unknown;
    albumName: string;
    guildId: string;
    channelId: string;
}>;
export type CreateAndLinkAlbumRequest = z.infer<typeof CreateAndLinkAlbumRequestSchema>;
