import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";
/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
declare class UnknownException implements HttpException {
    readonly status: HttpStatusCode;
    readonly name: string;
    readonly message: string;
    /**
     * Constructor for an UnknownException.
     * @param message the message for this exception
     */
    constructor(message: string);
    getResponse(): unknown;
}
export default UnknownException;
