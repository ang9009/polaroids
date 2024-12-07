import { FileStationError } from "shared/src/error-codes/fileStationError";
/**
 * Returns the corresponding FileStationError given an error code.
 * @param errorCode an error code from a failed FileStation request
 * @returns the corresponding FileStationError
 */
declare function getFileStationErrCode(errorCode: string): FileStationError;
export { getFileStationErrCode };
