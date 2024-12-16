import { z } from "zod";
import { DbErrorCode } from "../error-codes/dbErrorCode";
import { ErrorResponseSchema } from "./errorResponse";

export const DbExceptionResponseSchema = ErrorResponseSchema.extend({
  dbErrorCode: z.nativeEnum(DbErrorCode),
});

/**
 * The shape of the response when a database-related exception occurs.
 */
export type DbExceptionResponse = z.infer<typeof DbExceptionResponseSchema>;
