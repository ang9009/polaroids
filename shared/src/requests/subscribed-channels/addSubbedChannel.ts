import { z } from "zod";
import { CreateAlbumRequestSchema } from "../albums/createAlbum";
import { AlbumRequestType } from "./types/albumRequestType";

export const AddSubbedChannelRequestSchema = CreateAlbumRequestSchema.extend({
  channelId: z
    .string({
      invalid_type_error: "channelId must be a string",
      required_error: "channelId is required",
    })
    .min(1),
  albumRequestType: z.nativeEnum(AlbumRequestType),
  guildId: z.string({
    invalid_type_error: "guildId must be a string",
    required_error: "guildId is required",
  }),
})
.refine(
  (req) => {
    const albumType = req.albumRequestType;
    if (albumType === AlbumRequestType.EXISTING && req.albumDesc) {
      return false;
    }
    return true;
  },
  {
    message: "If you are using an existing album, do not specify an albumDesc",
  }
);

export type AddSubbedChannelRequest = z.infer<typeof AddSubbedChannelRequestSchema>;
