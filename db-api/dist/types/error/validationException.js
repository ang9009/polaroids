import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import HttpStatusCode from "../../data/statusCodes";
/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class ValidationException {
    /**
     * Constructor for a ValidationException.
     * @param zodError the associated Zod error
     */
    constructor(zodError) {
        this.status = HttpStatusCode.BAD_REQUEST;
        this.name = "ValidationException";
        this.zodError = zodError;
        this.message = "Request has missing or invalid parameters";
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    getResponse() {
        return {
            error: DbApiErrorType.REQUEST_EXCEPTION,
            message: this.message,
            errors: this.zodError.errors,
        };
    }
}
export default ValidationException;
