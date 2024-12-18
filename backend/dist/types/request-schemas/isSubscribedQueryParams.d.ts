import { z } from "zod";
export declare const IsSubscribedQueryParamsSchema: z.ZodObject<{
    channelId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    channelId: string;
}, {
    channelId: string;
}>;
export type IsSubscribedQueryParams = z.infer<typeof IsSubscribedQueryParamsSchema>;
