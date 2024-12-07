import { ErrorResponse } from "shared/src/error-responses/errorResponse";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";
/**
 * Thrown when a user tries to access a route that does not exist.
 */
declare class NotFoundException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly status: HttpStatusCode;
    /**
     * Constructor for a NotFoundException.
     */
    constructor();
    getResponse(): ErrorResponse;
}
export default NotFoundException;
