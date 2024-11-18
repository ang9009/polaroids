import { z } from "zod";

const CreateAlbumQueryParamsSchema = z.object({
  albumName: z.string({
    invalid_type_error: "albumName must be a string",
    required_error: "albumName is required",
  }),
});

type CreateAlbumQueryParams = z.infer<typeof CreateAlbumQueryParamsSchema>;

export { CreateAlbumQueryParams, CreateAlbumQueryParamsSchema };
