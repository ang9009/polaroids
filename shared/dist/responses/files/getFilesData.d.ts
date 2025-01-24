import { z } from "zod";
export declare const GetFilesDataResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        discordId: z.ZodString;
        fileName: z.ZodString;
        extension: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        extension: string;
        discordId: string;
        createdAt: string;
        fileName: string;
    }, {
        extension: string;
        discordId: string;
        createdAt: string;
        fileName: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        extension: string;
        discordId: string;
        createdAt: string;
        fileName: string;
    }[];
}, {
    data: {
        extension: string;
        discordId: string;
        createdAt: string;
        fileName: string;
    }[];
}>;
export type GetFilesDataResponse = z.infer<typeof GetFilesDataResponseSchema>;
