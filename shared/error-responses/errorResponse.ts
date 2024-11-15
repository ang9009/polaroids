import { DbApiErrorType } from "shared/error-codes/dbApiErrorType";
/**
 * Describes the shape of a generic error response.
 */
export interface ErrorResponse {
  message: string; // Ensures all errors have a 'message' field
  error: DbApiErrorType;
}
