import { z } from "zod";
export declare const FileStationResponseSchema: z.ZodDiscriminatedUnion<"success", [z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    success: true;
    data?: any;
}, {
    success: true;
    data?: any;
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
export type FileStationResponse = z.infer<typeof FileStationResponseSchema>;
