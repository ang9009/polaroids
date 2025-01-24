import { z } from "zod";
export declare const GetUserInfoResponseSchema: z.ZodObject<{
    avatar: z.ZodString;
    username: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    avatar: string;
    username: string;
}, {
    id: string;
    avatar: string;
    username: string;
}>;
export type GetUserInfoResponse = z.infer<typeof GetUserInfoResponseSchema>;
