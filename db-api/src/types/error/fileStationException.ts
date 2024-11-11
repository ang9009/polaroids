import { DbApiErrorType } from "shared/error-codes/dbApiErrorType";
import { FileStationError } from "shared/error-codes/fileStationError";
import { FSExceptionResponse } from "shared/error-responses/fsExceptionResponse";
import HttpStatusCode from "../../data/httpStatusCode";
import { HttpException } from "./httpException";

/**
 * Represents when something goes wrong with a call to FileStaton (a FileStation Exception).
 */
class FSException implements HttpException {
  readonly name: string;
  readonly message: string;
  readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  readonly fileStationError: FileStationError;

  /**
   * Constructor for a FSException.
   * @param fileStationError the fileStation error
   */
  constructor(fileStationError: FileStationError) {
    this.name = "FileStationException";
    this.fileStationError = fileStationError;
    this.message = "Something went wrong while attempting to make a call to FileStation";
  }

  /**
   * See HttpException.
   * @returns the response error object
   */
  getResponse(): FSExceptionResponse {
    return {
      error: DbApiErrorType.FILESTATION_EXCEPTION,
      fileStationError: this.fileStationError,
      message: this.message,
    };
  }
}

export default FSException;
