import { z } from "zod";
export const UpdateChannelAlbumRequestSchema = z.object({
    guildId: z.string({
        invalid_type_error: "guildId must be a string",
        required_error: "guildId is required",
    }),
    channelId: z.string({
        invalid_type_error: "channelId must be a string",
        required_error: "channelId is required",
    }),
    albumId: z.string(),
});
//# sourceMappingURL=updateChannelAlbum.js.map