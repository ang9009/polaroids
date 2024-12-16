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
  albumName: z.string({
    invalid_type_error: "albumName must be a string",
    required_error: "albumName is required",
  }),
});

export type UpdateChannelAlbumRequest = z.infer<typeof UpdateChannelAlbumRequestSchema>;
