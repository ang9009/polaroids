import { z } from "zod";
export declare const FSUploadResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
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
export type FSUploadResponse = z.infer<typeof FSUploadResponseSchema>;
