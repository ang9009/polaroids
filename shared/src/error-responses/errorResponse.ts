import { z } from "zod";
import { DbApiErrorType } from "../error-codes/dbApiErrorType";
export const ErrorResponseSchema = z.object({
  message: z.string(),
  error: z.nativeEnum(DbApiErrorType),
});

/**
 * Describes the shape of a generic error response.
 */
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
