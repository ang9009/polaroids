import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import HttpStatusCode from "../../data/httpStatusCode";
/**
 * An exception thrown when the requested route or resource not found
 */
class NotFoundException {
    /**
     * Constructor for an NotFoundException.
     */
    constructor() {
        this.status = HttpStatusCode.NOT_FOUND;
        this.name = "NotFoundException";
        this.message = "Route/resource not found";
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    getResponse() {
        return { errorType: ApiErrorType.NOT_FOUND_EXCEPTION, message: this.message };
    }
}
export default NotFoundException;
