import DbApiErrorType from "shared/error-codes/DbApiErrorCode";
import HttpStatusCode from "../../data/statusCodes";
import { ErrorResponse, HttpException } from "./httpException";

/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
class GenericException implements HttpException {
  readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  readonly name: string;
  readonly message: string;

  constructor(message: string) {
    this.message = message;
    this.name = "RuntimeException";
  }

  getResponse(): ErrorResponse {
    return { error: DbApiErrorType.UNKNOWN_EXCEPTION, message: this.message };
  }
}

export default GenericException;
