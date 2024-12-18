import { ValidationExceptionResponse } from "shared/src/responses/error//validationExceptionResponse";
import { ZodError } from "zod";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";
/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
declare class ValidationException implements HttpException {
    readonly name: string;
    readonly zodError: ZodError;
    readonly status: HttpStatusCode;
    readonly message: string;
    /**
     * Constructor for a ValidationException.
     * @param zodError the associated Zod error
     */
    constructor(zodError: ZodError);
    getResponse(): ValidationExceptionResponse;
}
export default ValidationException;
