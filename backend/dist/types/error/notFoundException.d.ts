import HttpStatusCode from "../../data/httpStatusCode";
import { HttpException } from "./httpException";
/**
 * An exception thrown when the requested route or resource not found
 */
declare class NotFoundException implements HttpException {
    readonly status: HttpStatusCode;
    readonly name: string;
    readonly message: string;
    /**
     * Constructor for an NotFoundException.
     */
    constructor();
    getResponse(): unknown;
}
export default NotFoundException;
