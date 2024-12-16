import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType
";
import { z } from "zod";
export const AddSubChannelReqBodySchema = z
    .object({
    channelId: z
        .string({
        invalid_type_error: "channelId must be a string",
        required_error: "channelId is required",
    })
        .min(1),
    albumRequestType: z.nativeEnum(AlbumRequestType),
    albumName: z
        .string({
        invalid_type_error: "albumName must be a string",
        required_error: "albumName is required",
    })
        .min(1)
        .max(20),
    albumDesc: z
        .string({
        invalid_type_error: "albumDesc must be a string",
    })
        .min(1)
        .max(40)
        .optional(),
    guildId: z.string({
        invalid_type_error: "guildId must be a string",
        required_error: "guildId is required",
    }),
})
    .refine((req) => {
    const albumType = req.albumRequestType;
    if (albumType === AlbumRequestType.CREATE_NEW && !req.albumDesc) {
        return false;
    }
    return true;
}, {
    message: "If you are creating a new album, the albumDesc property is required and cannot be empty",
})
    .refine((req) => {
    const albumType = req.albumRequestType;
    if (albumType === AlbumRequestType.EXISTING && req.albumDesc) {
        return false;
    }
    return true;
}, {
    message: "If you are using an existing album, do not specify an albumDesc",
});
