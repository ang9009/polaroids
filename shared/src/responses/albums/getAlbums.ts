import { z } from "zod";

export const AlbumSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export type Album = z.infer<typeof AlbumSchema>;

const GetAlbumsResponseSchema = z.array(AlbumSchema);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
