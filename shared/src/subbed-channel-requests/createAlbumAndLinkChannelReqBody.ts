import { z } from "zod";
import { UpdateChannelAlbumReqSchema } from "./updateChannelAlbumReq";

export const CreateAndLinkAlbumSchema = UpdateChannelAlbumReqSchema.extend({
  albumDesc: z.string({
    invalid_type_error: "albumDesc must be a string",
    required_error: "albumDesc is required",
  }),
});

export type CreateAndLinkAlbum = z.infer<typeof CreateAndLinkAlbumSchema>;
