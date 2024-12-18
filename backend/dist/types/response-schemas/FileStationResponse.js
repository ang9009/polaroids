import { z } from "zod";
export const FileStationResponseSchema = z.discriminatedUnion("success", [
    z.object({
        success: z.literal(true),
        data: z.any(),
    }),
    z.object({
        success: z.literal(false),
        error: z.object({
            code: z.number(),
        }),
    }),
]);
