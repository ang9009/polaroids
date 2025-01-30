import { AlbumSchema } from "backend/prisma/generated/zod";
import { z } from "zod";

const GetAlbumsResponseSchema = z.array(
  AlbumSchema.extend({
    files: z.array(
      z.object({
        discordId: z.string(),
      })
    ),
    _count: z.object({
      files: z.number(),
    }),
  })
);

type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;

export { GetAlbumsResponse, GetAlbumsResponseSchema };
