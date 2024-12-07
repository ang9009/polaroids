import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import { ValidationExceptionResponse } from "shared/src/error-responses/validationExceptionResponse";
import { ZodError, ZodIssue } from "zod";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";

/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class ValidationException implements HttpException {
  readonly name: string;
  readonly zodError: ZodError;
  readonly status: HttpStatusCode;
  readonly message: string;

  /**
   * Constructor for a ValidationException.
   * @param zodError the associated Zod error
   */
  constructor(zodError: ZodError) {
    this.status = HttpStatusCode.BAD_REQUEST;
    this.name = "ValidationException";
    this.zodError = zodError;
    this.message = "Request has missing or invalid parameters";
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse(): ValidationExceptionResponse {
    const flattened = this.zodError.flatten((issue: ZodIssue) => ({
      message: issue.message,
      errorCode: issue.code,
    }));

    return {
      error: DbApiErrorType.REQUEST_EXCEPTION,
      message: this.message,
      errors: { formErrors: flattened.formErrors, fieldErrors: flattened.fieldErrors },
    };
  }
}

export default ValidationException;
