import DbApiErrorType from "shared/error-codes/DbApiErrorCode";
import RequestExceptionResponse from "shared/error-responses/requestExceptionResponse";
import { ZodError } from "zod";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";

/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class RequestException implements HttpException {
  readonly name: string;
  readonly zodError: ZodError;
  readonly status: HttpStatusCode = HttpStatusCode.BAD_REQUEST;
  readonly message: string;

  constructor(zodError: ZodError) {
    this.name = "RequestException";
    this.zodError = zodError;
    this.message = "Request body has missing or invalid parameters";
  }

  getResponse(): RequestExceptionResponse {
    return {
      error: DbApiErrorType.REQUEST_EXCEPTION,
      message: this.message,
      invalidParams: this.zodError.message,
    };
  }
}

export default RequestException;
