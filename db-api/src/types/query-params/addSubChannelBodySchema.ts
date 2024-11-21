import { z } from "zod";

export const addSubChannelBodySchema = z.object({
  channelId: z.string({
    invalid_type_error: "channelId must be a string",
    required_error: "channelId is required",
  }),
  albumName: z.string({
    invalid_type_error: "albumName must be a string",
    required_error: "albumName is required",
  }),
  guildId: z.string({
    invalid_type_error: "guildId must be a string",
    required_error: "guildId is required",
  }),
});

export type addSubChannelBodyParams = z.infer<typeof addSubChannelBodySchema>;
