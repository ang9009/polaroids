import { AlbumSchema } from "backend/prisma/generated/zod";
import { z } from "zod";

const GetAlbumsResponseSchema = z.array(AlbumSchema);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
