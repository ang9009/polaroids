import { z } from "zod";
declare const AlbumNameQueryParamSchema: z.ZodObject<{
    albumName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumName: string;
}, {
    albumName: string;
}>;
type AlbumNameQueryParam = z.infer<typeof AlbumNameQueryParamSchema>;
export { AlbumNameQueryParam, AlbumNameQueryParamSchema };
