import { z } from "zod";
import { AlbumNameSchema, CreateAlbumRequestSchema } from "./createAlbum";

export const EditAlbumRequestSchema = CreateAlbumRequestSchema.extend({
  albumName: AlbumNameSchema,
  newAlbumName: AlbumNameSchema,
});

export type EditAlbumRequestData = z.infer<typeof EditAlbumRequestSchema>;
