import { ErrorResponse } from "shared/src/responses/error/errorResponse";
import HttpStatusCode from "../../data/statusCodes";
/**
 * An exception that has an HTTP status code tied to it.
 */
interface HttpException extends Error {
    readonly status: HttpStatusCode;
    getResponse(): ErrorResponse;
}
export { HttpException };
