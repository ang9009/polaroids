import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import HttpStatusCode from "../../data/statusCodes";
/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
class UnknownException {
    /**
     * Constructor for an UnknownException.
     * @param message the message for this exception
     */
    constructor(message) {
        this.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.message = message;
        this.name = "UnknownException";
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    getResponse() {
        return { errorType: ApiErrorType.UNKNOWN_EXCEPTION, message: this === null || this === void 0 ? void 0 : this.message };
    }
}
export default UnknownException;
