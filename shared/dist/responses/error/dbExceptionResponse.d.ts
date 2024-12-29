import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
import { DbErrorCode } from "../../error-codes/dbErrorCode";
export declare const DbExceptionResponseSchema: z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<ApiErrorType.DB_EXCEPTION>;
    dbErrorCode: z.ZodNativeEnum<typeof DbErrorCode>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: ApiErrorType.DB_EXCEPTION;
    dbErrorCode: DbErrorCode;
}, {
    message: string;
    errorType: ApiErrorType.DB_EXCEPTION;
    dbErrorCode: DbErrorCode;
}>;
export type DbExceptionResponse = z.infer<typeof DbExceptionResponseSchema>;
