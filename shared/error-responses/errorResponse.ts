import DbApiErrorType from "../error-codes/DbApiErrorCode";
/**
 * Describes the shape of a generic error response.
 */
interface ErrorResponse {
  message: string; // Ensures all errors have a 'message' field
  error: DbApiErrorType;
}

export default ErrorResponse;
