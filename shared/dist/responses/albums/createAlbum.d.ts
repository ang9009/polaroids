import { z } from "zod";
export declare const CreateAlbumResponseSchema: z.ZodObject<{
    albumId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    albumId: string;
}, {
    albumId: string;
}>;
export type CreateAlbumResponse = z.infer<typeof CreateAlbumResponseSchema>;
