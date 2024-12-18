import { z } from "zod";

export const AlbumNameSchema = z.string().min(1).max(20);

export const AlbumDescSchema = z.preprocess(
  (e) => (e === "" ? undefined : e),
  z.string().min(1).max(40).optional()
);

export const CreateAlbumRequestSchema = z.object({
  albumName: AlbumNameSchema,
  albumDesc: z.preprocess((e) => (e === "" ? undefined : e), z.string().min(1).max(40).optional()),
});

export type CreateAlbumRequestBody = z.infer<typeof CreateAlbumRequestSchema>;
