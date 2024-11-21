import { z } from "zod";

const createAlbumQueryParamsSchema = z.object({
  albumName: z.string({
    invalid_type_error: "albumName must be a string",
    required_error: "albumName is required",
  }),
});

type createAlbumQueryParams = z.infer<typeof createAlbumQueryParamsSchema>;

export { createAlbumQueryParams, createAlbumQueryParamsSchema };
