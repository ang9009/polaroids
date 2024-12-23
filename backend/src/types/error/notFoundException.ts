import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
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
  getResponse(): unknown {
    return { message: this.message, errorType: ApiErrorType.NOT_FOUND_EXCEPTION };
  }
}

export default NotFoundException;
