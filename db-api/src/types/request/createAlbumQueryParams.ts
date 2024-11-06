import { z } from "zod";

const CreateAlbumQueryParamsSchema = z.object({
  albumId: z.string({
    invalid_type_error: "Album id must be a string",
    required_error: "Album id is required",
  }),
  albumName: z.string({
    invalid_type_error: "Album name must be a string",
    required_error: "Album name is required",
  }),
});

type CreateAlbumQueryParams = z.infer<typeof CreateAlbumQueryParamsSchema>;

export { CreateAlbumQueryParams, CreateAlbumQueryParamsSchema };
