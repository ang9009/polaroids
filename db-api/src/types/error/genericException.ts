import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import { ErrorResponse } from "shared/src/error-responses/errorResponse";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";

/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
class UnknownException implements HttpException {
  readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  readonly name: string;
  readonly message: string;

  /**
   * Constructor for an UnknownException.
   * @param message the message for this exception
   */
  constructor(message: string) {
    this.message = message;
    this.name = "RuntimeException";
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse(): ErrorResponse {
    return { error: DbApiErrorType.UNKNOWN_EXCEPTION, message: this.message };
  }
}

export default UnknownException;
