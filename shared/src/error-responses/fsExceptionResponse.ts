import { FileStationError } from "../src/error-codes/fileStationError";
import { ErrorResponse } from "./errorResponse";

interface FSExceptionResponse extends ErrorResponse {
  fileStationError: FileStationError;
}

export { FSExceptionResponse };
