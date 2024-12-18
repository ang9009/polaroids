import { z } from "zod";
export declare const FSWebUploadResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    success: true;
}, {
    success: true;
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    errno: z.ZodObject<{
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
    }, {
        key: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: false;
    errno: {
        key: string;
    };
}, {
    success: false;
    errno: {
        key: string;
    };
}>]>;
export type FSWebUploadResponse = z.infer<typeof FSWebUploadResponseSchema>;
