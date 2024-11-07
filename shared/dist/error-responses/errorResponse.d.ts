import DbApiErrorType from "../error-codes/DbApiErrorCode";
/**
 * Describes the shape of a generic error response.
 */
interface ErrorResponse {
    message: string;
    error: DbApiErrorType;
}
export default ErrorResponse;
