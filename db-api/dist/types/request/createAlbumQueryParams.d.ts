import { z } from "zod";
declare const CreateAlbumQueryParamsSchema: z.ZodObject<{
    albumId: z.ZodString;
    albumName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumId: string;
    albumName: string;
}, {
    albumId: string;
    albumName: string;
}>;
type CreateAlbumQueryParams = z.infer<typeof CreateAlbumQueryParamsSchema>;
export { CreateAlbumQueryParams, CreateAlbumQueryParamsSchema };
