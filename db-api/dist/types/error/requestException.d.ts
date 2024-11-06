import { ZodError } from "zod";
import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";
/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
declare class RequestException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly status: HttpStatusCode;
    constructor(invalidParams: ZodError);
    getResponse(): {
        [key: string]: string;
    };
}
export default RequestException;
