import { z } from "zod";
declare const GetAlbumsResponseSchema: z.ZodArray<z.ZodObject<{
    albumId: z.ZodString;
    albumName: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    description: string | null;
    albumName: string;
    albumId: string;
    createdAt: Date;
}, {
    description: string | null;
    albumName: string;
    albumId: string;
    createdAt: Date;
}>, "many">;
type GetAlbumsResponse = z.infer<typeof GetAlbumsResponseSchema>;
export { GetAlbumsResponse, GetAlbumsResponseSchema };
