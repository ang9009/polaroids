import { z } from "zod";

const AlbumExistsResponseSchema = z.object({
  albumExists: z.boolean(),
});

type AlbumExistsResponse = z.infer<typeof AlbumExistsResponseSchema>;

export { AlbumExistsResponse, AlbumExistsResponseSchema };
