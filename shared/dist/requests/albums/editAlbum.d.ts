import { z } from "zod";
export declare const EditAlbumRequestSchema: z.ZodObject<{
    albumId: z.ZodString;
    newAlbumName: z.ZodString;
    newAlbumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    newAlbumDesc?: string | undefined;
    albumId: string;
    newAlbumName: string;
}, {
    newAlbumDesc?: unknown;
    albumId: string;
    newAlbumName: string;
}>;
export type EditAlbumRequestData = z.infer<typeof EditAlbumRequestSchema>;
