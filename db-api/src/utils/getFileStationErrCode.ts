import { FileStationError } from "shared/error-codes/fileStationError";

/**
 *
 * @param errorCode
 */
function getFileStationErrCode(errorCode: string): FileStationError {
  switch (errorCode) {
    case "100":
      return FileStationError.UNKNOWN_ERROR;
    case "101":
      return FileStationError.NO_PARAMETER;
    case "102":
      return FileStationError.API_METHOD_OR_VERSION_NOT_SPECIFIED;
    case "103":
      return FileStationError.API_DOES_NOT_EXIST;
    case "104":
      return FileStationError.METHOD_DOES_NOT_EXIST;
    case "105":
      return FileStationError.VERSION_UNSUPPORTED;
    case "106":
      return FileStationError.PERMISSION_DENIED;
    case "107":
      return FileStationError.SESSION_TIMEOUT;
    case "119":
      return FileStationError.DUPLICATE_LOGIN_INTERRUPTED_SESSION;
    case "120":
      return FileStationError.SID_NOT_FOUND;
    default:
      return FileStationError.UNKNOWN_ERROR;
  }
}
