import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import HttpStatusCode from "../../data/httpStatusCode";
import { HttpException } from "./httpException";

/**
 * An exception thrown when the requested route or resource not found
 */
class NotFoundException implements HttpException {
  readonly status: HttpStatusCode = HttpStatusCode.NOT_FOUND;
  readonly name: string;
  readonly message: string;

  /**
   * Constructor for an NotFoundException.
   */
  constructor() {
    this.name = "NotFoundException";
    this.message = "Route/resource not found";
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse(): unknown {
    return { errorType: ApiErrorType.NOT_FOUND_EXCEPTION, message: this.message };
  }
}

export default NotFoundException;
