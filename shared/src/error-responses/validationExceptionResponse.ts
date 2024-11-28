import { ErrorResponse } from "./errorResponse";

export interface ValidationExceptionResponse extends ErrorResponse {
  // See https://zod.dev/ERROR_HANDLING?id=flattening-errors
  errors: {
    formErrors: unknown[]; // This could be an array of any type of errors
    fieldErrors: { [key: string]: { message: string; errorCode: string }[] | undefined }; // Maps field names to error objects
  };
}
