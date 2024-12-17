import { z } from "zod";
import { CreateAlbumRequestSchema } from "../albums/createAlbum";

export const CreateAndLinkAlbumRequestSchema = CreateAlbumRequestSchema.extend({
  guildId: z.string(),
  channelId: z.string(),
});

export type CreateAndLinkAlbumRequest = z.infer<typeof CreateAndLinkAlbumRequestSchema>;
