import DbErrorCode from "../error-codes/DbErrorCode";
import ErrorResponse from "./errorResponse";
/**
 * The shape of the response when a database-related exception occurs.
 */
interface DbExceptionResponse extends ErrorResponse {
    dbErrorCode: DbErrorCode;
}
/**
 * Type guard for DbExceptionResponse.
 * @param err the error object
 * @returns whether err is a DbExceptionResponse
 */
declare const isDbExceptionResponse: (err: any) => err is DbExceptionResponse;
export { DbExceptionResponse, isDbExceptionResponse };
