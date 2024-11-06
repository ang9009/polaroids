import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";
/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
declare class NotFoundException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly status: HttpStatusCode;
    constructor();
    getResponse(): {
        [key: string]: string;
    };
}
export default NotFoundException;
