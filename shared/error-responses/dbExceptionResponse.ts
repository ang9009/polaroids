import { DbErrorCode } from "../error-codes/dbErrorCode";
import { ErrorResponse } from "./errorResponse";

/**
 * The shape of the response when a database-related exception occurs.
 */
interface DbExceptionResponse extends ErrorResponse {
  dbErrorCode: DbErrorCode;
}

export { DbExceptionResponse };
