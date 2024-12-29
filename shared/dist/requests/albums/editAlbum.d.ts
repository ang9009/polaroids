import { z } from "zod";
export declare const EditAlbumRequestSchema: z.ZodObject<{
    albumId: z.ZodString;
    newAlbumName: z.ZodString;
    newAlbumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    albumId: string;
    newAlbumName: string;
    newAlbumDesc?: string | undefined;
}, {
    albumId: string;
    newAlbumName: string;
    newAlbumDesc?: unknown;
}>;
export type EditAlbumRequestData = z.infer<typeof EditAlbumRequestSchema>;
