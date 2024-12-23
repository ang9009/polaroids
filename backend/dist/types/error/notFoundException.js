import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import HttpStatusCode from "../../data/statusCodes";
/**
 * Thrown when a user tries to access a route that does not exist.
 */
class NotFoundException {
  /**
   * Constructor for a NotFoundException.
   */
  constructor() {
    this.status = HttpStatusCode.BAD_REQUEST;
    this.name = "NotFoundException";
    this.message = "Route could not be found";
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse() {
    return { message: this.message, error: ApiErrorType.NOT_FOUND_EXCEPTION };
  }
}
export default NotFoundException;
