import { FileStationError } from "shared/src/error-codes/fileStationError";
import { FSExceptionResponse } from "shared/src/responses/error//fsExceptionResponse";
import HttpStatusCode from "../../data/httpStatusCode";
import { HttpException } from "./httpException";
/**
 * Represents when something goes wrong with a call to FileStaton (a FileStation Exception).
 */
declare class FSException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly status: HttpStatusCode;
    readonly fileStationError: FileStationError;
    /**
     * Constructor for a FSException.
     * @param fileStationError the fileStation error
     */
    constructor(fileStationError: FileStationError);
    /**
     * See HttpException.
     * @returns the response error object
     */
    getResponse(): FSExceptionResponse;
}
export default FSException;
