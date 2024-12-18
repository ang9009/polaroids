import { z } from "zod";

export const DeleteAlbumRequestSchema = z.object({
  albumName: z.string(),
});
