import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";
/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
declare class GenericException implements HttpException {
    readonly status: HttpStatusCode;
    readonly name: string;
    readonly message: string;
    constructor(message: string);
    getResponse(): {
        [key: string]: string;
    };
}
export default GenericException;
