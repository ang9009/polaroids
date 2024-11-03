import { z } from "zod";

const CreateAlbumQueryParamsSchema = z.object({
  albumId: z.string(),
  albumName: z.string(),
});

type CreateAlbumQueryParams = z.infer<typeof CreateAlbumQueryParamsSchema>;

export { CreateAlbumQueryParams, CreateAlbumQueryParamsSchema };
