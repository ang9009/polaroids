import { z } from "zod";
export declare const ApiErrorResponseSchema: z.ZodDiscriminatedUnion<"errorType", [z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<import("../../error-codes/apiErrorType").ApiErrorType.DB_EXCEPTION>;
    dbErrorCode: z.ZodNativeEnum<typeof import("../../error-codes/dbErrorCode").DbErrorCode>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.DB_EXCEPTION;
    dbErrorCode: import("../../error-codes/dbErrorCode").DbErrorCode;
}, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.DB_EXCEPTION;
    dbErrorCode: import("../../error-codes/dbErrorCode").DbErrorCode;
}>, z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<import("../../error-codes/apiErrorType").ApiErrorType.FILESTATION_EXCEPTION>;
    fileStationError: z.ZodNativeEnum<typeof import("../../error-codes/fileStationError").FileStationError>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.FILESTATION_EXCEPTION;
    fileStationError: import("../../error-codes/fileStationError").FileStationError;
}, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.FILESTATION_EXCEPTION;
    fileStationError: import("../../error-codes/fileStationError").FileStationError;
}>, z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<import("../../error-codes/apiErrorType").ApiErrorType.UNKNOWN_EXCEPTION>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.UNKNOWN_EXCEPTION;
}, {
    message: string;
    errorType: import("../../error-codes/apiErrorType").ApiErrorType.UNKNOWN_EXCEPTION;
}>]>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
