import ApiErrorType from "../error-codes/DbApiErrorCode";
/**
 * Describes the shape of a generic error response.
 */
interface ErrorResponse {
  message: string;
  error: ApiErrorType;
}
export default ErrorResponse;
