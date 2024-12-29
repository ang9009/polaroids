import { z } from "zod";
import { AlbumRequestType } from "./types/albumRequestType";
export declare const AddSubbedChannelRequestSchema: z.ZodDiscriminatedUnion<"albumRequestType", [z.ZodObject<z.objectUtil.extendShape<{
    albumName: z.ZodString;
    albumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, {
    albumRequestType: z.ZodLiteral<AlbumRequestType.CREATE_NEW>;
    channelId: z.ZodString;
    guildId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    albumName: string;
    guildId: string;
    albumRequestType: AlbumRequestType.CREATE_NEW;
    channelId: string;
    albumDesc?: string | undefined;
}, {
    albumName: string;
    guildId: string;
    albumRequestType: AlbumRequestType.CREATE_NEW;
    channelId: string;
    albumDesc?: unknown;
}>, z.ZodObject<{
    albumRequestType: z.ZodLiteral<AlbumRequestType.EXISTING>;
    channelId: z.ZodString;
    guildId: z.ZodString;
    albumId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumId: string;
    guildId: string;
    albumRequestType: AlbumRequestType.EXISTING;
    channelId: string;
}, {
    albumId: string;
    guildId: string;
    albumRequestType: AlbumRequestType.EXISTING;
    channelId: string;
}>]>;
export type AddSubbedChannelRequest = z.infer<typeof AddSubbedChannelRequestSchema>;
