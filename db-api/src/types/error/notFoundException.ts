import DbApiErrorCode from "shared/error-codes/DbApiErrorCode";
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

  constructor() {
    this.name = "NotFoundException";
    this.message = "Route could not be found";
  }

  getResponse(): ErrorResponse {
    return { message: this.message, error: DbApiErrorCode.NOT_FOUND_EXCEPTION };
  }
}

export default NotFoundException;
