import { DbApiErrorType } from "shared/error-codes/dbApiErrorType";
import ErrorResponse from "shared/error-responses/errorResponse";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";

/**
 * Thrown when a user tries to access a route that does not exist.
 */
class NotFoundException implements HttpException {
  readonly name: string;
  readonly message: string;
  readonly status: HttpStatusCode = HttpStatusCode.BAD_REQUEST;

  /**
   * Constructor for a NotFoundException.
   */
  constructor() {
    this.name = "NotFoundException";
    this.message = "Route could not be found";
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse(): ErrorResponse {
    return { message: this.message, error: DbApiErrorType.NOT_FOUND_EXCEPTION };
  }
}

export default NotFoundException;
