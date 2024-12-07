import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
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
        this.name = "RuntimeException";
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    getResponse() {
        return { error: DbApiErrorType.UNKNOWN_EXCEPTION, message: this.message };
    }
}
export default UnknownException;
