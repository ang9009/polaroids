import DbApiErrorCode from "shared/DbApiErrorCode.js";
import HttpStatusCode from "../../data/statusCodes";

/**
 * Describes the shape of an error response.
 */
interface ErrorResponse {
  message: string; // Ensures all errors have a 'message' field
  error: DbApiErrorCode;
}

/**
 * An exception that has an HTTP status code tied to it.
 */
interface HttpException extends Error {
  readonly status: HttpStatusCode;
  getResponse(): { [key: string]: string };
}

export default HttpException;
