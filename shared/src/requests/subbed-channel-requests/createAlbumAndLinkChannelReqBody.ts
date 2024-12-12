import { z } from "zod";
import { UpdateChannelAlbumReqSchema } from "./updateChannelAlbumReq";

export const CreateAndLinkAlbumReqSchema = UpdateChannelAlbumReqSchema.extend({
  albumDesc: z.string({
    invalid_type_error: "albumDesc must be a string",
    required_error: "albumDesc is required",
  }),
});

export type CreateAndLinkAlbumReq = z.infer<typeof CreateAndLinkAlbumReqSchema>;
