import { AlbumRequestType } from "shared/src/subbed-channel-requests/albumRequestType";
import { z } from "zod";
export declare const AddSubChannelReqBodySchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    channelId: z.ZodString;
    albumRequestType: z.ZodNativeEnum<typeof AlbumRequestType>;
    albumName: z.ZodString;
    albumDesc: z.ZodOptional<z.ZodString>;
    guildId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}>, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}>, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}, {
    guildId: string;
    channelId: string;
    albumName: string;
    albumRequestType: AlbumRequestType;
    albumDesc?: string | undefined;
}>;
export type AddSubChannelReqBody = z.infer<typeof AddSubChannelReqBodySchema>;
