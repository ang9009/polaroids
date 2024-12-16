import { z } from "zod";
import { AlbumSchema } from "../../../../db-api/generated/zod/index";

const GetAlbumsResponseSchema = z.array(AlbumSchema);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
