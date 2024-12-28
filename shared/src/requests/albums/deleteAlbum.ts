import { z } from "zod";

export const DeleteAlbumRequestSchema = z.object({
  albumId: z.string(),
});
