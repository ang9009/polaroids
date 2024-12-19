import { z } from "zod";
import { DbApiErrorType } from "../../error-codes/dbApiErrorType";

export const UnknownExceptionResponseSchema = z.object({
  message: z.string(),
  errorType: z.literal(DbApiErrorType.UNKNOWN_EXCEPTION),
});

export type UnknownExceptionResponse = z.infer<typeof UnknownExceptionResponseSchema>;
