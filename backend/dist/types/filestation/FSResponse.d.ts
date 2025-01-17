import { z } from "zod";
export declare const FSResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    data?: any;
    success: true;
}, {
    data?: any;
    success: true;
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodObject<{
        code: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        code: number;
    }, {
        code: number;
    }>;
}, "strip", z.ZodTypeAny, {
    error: {
        code: number;
    };
    success: false;
}, {
    error: {
        code: number;
    };
    success: false;
}>]>;
export type FSResponse = z.infer<typeof FSResponseSchema>;
