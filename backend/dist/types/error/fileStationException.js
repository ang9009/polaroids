import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import HttpStatusCode from "../../data/httpStatusCode";
/**
 * Represents when something goes wrong with a call to FileStaton (a FileStation Exception).
 */
class FSException {
    /**
     * Constructor for a FSException.
     * @param fileStationError the fileStation error
     */
    constructor(fileStationError) {
        this.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
        this.name = "FileStationException";
        this.fileStationError = fileStationError;
        this.message = "Something went wrong while attempting to make a call to FileStation";
    }
    /**
     * See HttpException.
     * @returns the response error object
     */
    getResponse() {
        return {
            errorType: DbApiErrorType.FILESTATION_EXCEPTION,
            fileStationError: this.fileStationError,
            message: this.message,
        };
    }
}
export default FSException;
