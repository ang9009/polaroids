import { z } from "zod";
export declare const AlbumNameSchema: z.ZodString;
export declare const AlbumDescSchema: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
export declare const CreateAlbumRequestSchema: z.ZodObject<{
    albumName: z.ZodString;
    albumDesc: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strip", z.ZodTypeAny, {
    albumDesc?: string | undefined;
    albumName: string;
}, {
    albumDesc?: unknown;
    albumName: string;
}>;
export type CreateAlbumRequestBody = z.infer<typeof CreateAlbumRequestSchema>;
