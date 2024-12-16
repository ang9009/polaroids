import { z } from "zod";

export const CreateAlbumRequestSchema = z.object({
  albumName: z.string(),
  albumDesc: z.string(),
});

export type CreateAlbumRequestBody = z.infer<typeof CreateAlbumRequestSchema>;
