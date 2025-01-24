import { z } from "zod";
export declare const GetFilesCursorSchema: z.ZodObject<{
    discordId: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    discordId: string;
    createdAt: string;
}, {
    discordId: string;
    createdAt: string;
}>;
export type GetFilesCursor = z.infer<typeof GetFilesCursorSchema>;
