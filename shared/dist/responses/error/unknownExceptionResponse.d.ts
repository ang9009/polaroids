import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
export declare const UnknownExceptionResponseSchema: z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<ApiErrorType.UNKNOWN_EXCEPTION>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: ApiErrorType.UNKNOWN_EXCEPTION;
}, {
    message: string;
    errorType: ApiErrorType.UNKNOWN_EXCEPTION;
}>;
export type UnknownExceptionResponse = z.infer<typeof UnknownExceptionResponseSchema>;
