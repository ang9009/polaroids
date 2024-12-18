import { z } from "zod";
import { AlbumDescSchema, AlbumNameSchema, CreateAlbumRequestSchema } from "./createAlbum";

export const EditAlbumRequestSchema = CreateAlbumRequestSchema.extend({
  albumName: AlbumNameSchema,
  newAlbumDesc: AlbumDescSchema,
  newAlbumName: AlbumNameSchema,
});

export type EditAlbumRequestData = z.infer<typeof EditAlbumRequestSchema>;
