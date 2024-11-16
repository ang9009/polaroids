import { z } from "zod";

const CreateAlbumQueryParamsSchema = z.object({
  albumId: z.string({
    invalid_type_error: "albumId must be a string",
    required_error: "albumId is required",
  }),
  albumName: z.string({
    invalid_type_error: "albumName must be a string",
    required_error: "albumName is required",
  }),
});

type CreateAlbumQueryParams = z.infer<typeof CreateAlbumQueryParamsSchema>;

export { CreateAlbumQueryParams, CreateAlbumQueryParamsSchema };
