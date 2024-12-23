import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import HttpStatusCode from "../../data/statusCodes";
import getDbErrorType from "../../utils/getDbErrorType";
/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
class DbException {
    /**
     * The constructor for a DbException.
     * @param prismaError the related Prisma Client error
     */
    constructor(prismaError) {
        this.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.name = "DbException";
        this.message = prismaError.message;
        this.dbErrorCode = getDbErrorType(prismaError);
    }
    // eslint-disable-next-line jsdoc/require-jsdoc
    getResponse() {
        return {
            errorType: ApiErrorType.DB_EXCEPTION,
            message: this.message,
            dbErrorCode: this.dbErrorCode,
        };
    }
}
export default DbException;
