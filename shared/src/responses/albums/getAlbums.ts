import { z } from "zod";
import { AlbumSchema } from "../../../../backend/generated/zod/index";

const GetAlbumsResponseSchema = z.array(AlbumSchema);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
