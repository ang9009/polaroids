import { z } from "zod";
import { AlbumSchema } from "../../../../backend/prisma/generated/zod";

const GetAlbumsResponseSchema = z.array(AlbumSchema);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
