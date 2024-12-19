import { z } from "zod";
import { DbApiErrorType } from "../../error-codes/dbApiErrorType";
import { DbErrorCode } from "../../error-codes/dbErrorCode";

export const DbExceptionResponseSchema = z.object({
  message: z.string(),
  errorType: z.literal(DbApiErrorType.DB_EXCEPTION),
  dbErrorCode: z.nativeEnum(DbErrorCode),
});

export type DbExceptionResponse = z.infer<typeof DbExceptionResponseSchema>;
