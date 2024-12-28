import { z } from "zod";
import { CreateAlbumRequestSchema } from "../albums/createAlbum";
import { AlbumRequestType } from "./types/albumRequestType";

export const AddSubbedChannelRequestSchema = z.discriminatedUnion("albumRequestType", [
  CreateAlbumRequestSchema.extend({
    albumRequestType: z.literal(AlbumRequestType.CREATE_NEW),
    channelId: z
      .string({
        invalid_type_error: "channelId must be a string",
        required_error: "channelId is required",
      })
      .min(1),
    guildId: z.string({
      invalid_type_error: "guildId must be a string",
      required_error: "guildId is required",
    }),
  }),
  z.object({
    albumRequestType: z.literal(AlbumRequestType.EXISTING),
    channelId: z.string().min(1),
    guildId: z.string(),
    albumId: z.string(),
  }),
]);

export type AddSubbedChannelRequest = z.infer<typeof AddSubbedChannelRequestSchema>;
