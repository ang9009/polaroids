import { z } from "zod";
import { AlbumDescSchema, AlbumNameSchema } from "./createAlbum";

export const EditAlbumRequestSchema = z.object({
  albumId: z.string(),
  newAlbumName: AlbumNameSchema,
  newAlbumDesc: AlbumDescSchema,
});

export type EditAlbumRequestData = z.infer<typeof EditAlbumRequestSchema>;
