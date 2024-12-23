import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";

export const UnknownExceptionResponseSchema = z.object({
  message: z.string(),
  errorType: z.literal(ApiErrorType.UNKNOWN_EXCEPTION),
});

export type UnknownExceptionResponse = z.infer<typeof UnknownExceptionResponseSchema>;
