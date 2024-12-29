import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
import { FileStationError } from "../../error-codes/fileStationError";
export declare const FSExceptionResponseSchema: z.ZodObject<{
    message: z.ZodString;
    errorType: z.ZodLiteral<ApiErrorType.FILESTATION_EXCEPTION>;
    fileStationError: z.ZodNativeEnum<typeof FileStationError>;
}, "strip", z.ZodTypeAny, {
    message: string;
    errorType: ApiErrorType.FILESTATION_EXCEPTION;
    fileStationError: FileStationError;
}, {
    message: string;
    errorType: ApiErrorType.FILESTATION_EXCEPTION;
    fileStationError: FileStationError;
}>;
export type FSExceptionResponse = z.infer<typeof FSExceptionResponseSchema>;
