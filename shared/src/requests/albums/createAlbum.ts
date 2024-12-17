import { z } from "zod";

export const CreateAlbumRequestSchema = z.object({
  albumName: z.string().min(1).max(20),
  albumDesc: z.preprocess((e) => (e === "" ? undefined : e), z.string().min(1).max(40).optional()),
});

export type CreateAlbumRequestBody = z.infer<typeof CreateAlbumRequestSchema>;
