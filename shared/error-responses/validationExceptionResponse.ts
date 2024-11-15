import { ErrorResponse } from "./errorResponse";

export interface ValidationExceptionResponse extends ErrorResponse {
  // Matches the shape of the fieldErrors property from a flattened ZodError.
  // See https://zod.dev/ERROR_HANDLING?id=post-processing-issues
  errors: { [x: string]: { message: string; errorCode: string }[] | undefined };
}
