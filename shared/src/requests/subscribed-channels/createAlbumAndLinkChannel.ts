import { z } from "zod";
import { UpdateChannelAlbumRequestSchema } from "./updateChannelAlbum";

export const CreateAndLinkAlbumRequestSchema = UpdateChannelAlbumRequestSchema.extend({
  albumDesc: z.string({
    invalid_type_error: "albumDesc must be a string",
    required_error: "albumDesc is required",
  }),
});

export type CreateAndLinkAlbumRequest = z.infer<typeof CreateAndLinkAlbumRequestSchema>;
