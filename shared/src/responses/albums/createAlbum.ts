import { z } from "zod";

export const CreateAlbumResponseSchema = z.object({
  albumId: z.string(),
});

export type CreateAlbumResponse = z.infer<typeof CreateAlbumResponseSchema>;
