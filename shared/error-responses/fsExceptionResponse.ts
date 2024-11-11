import { FileStationError } from "../error-codes/fileStationError";
import ErrorResponse from "./errorResponse";

interface FSExceptionResponse extends ErrorResponse {
  fileStationError: FileStationError;
}

export { FSExceptionResponse };
