import { z } from "zod";
export declare const GetFilesRequestSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodObject<{
        discordId: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        discordId: string;
        createdAt: string;
    }, {
        discordId: string;
        createdAt: string;
    }>>;
    searchQuery: z.ZodOptional<z.ZodString>;
    albumId: z.ZodOptional<z.ZodString>;
    pageSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    albumId?: string | undefined;
    cursor?: {
        discordId: string;
        createdAt: string;
    } | undefined;
    searchQuery?: string | undefined;
    pageSize: number;
}, {
    albumId?: string | undefined;
    cursor?: {
        discordId: string;
        createdAt: string;
    } | undefined;
    searchQuery?: string | undefined;
    pageSize: number;
}>;
export type GetFilesRequest = z.infer<typeof GetFilesRequestSchema>;
