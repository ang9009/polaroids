import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
import { DbErrorCode } from "../../error-codes/dbErrorCode";
import { FileStationError } from "../../error-codes/fileStationError";
export const ApiErrorResponseSchema = z.discriminatedUnion("errorType", [
  // dbException
  z.object({
    message: z.string(),
    errorType: z.literal(ApiErrorType.DB_EXCEPTION),
    dbErrorCode: z.nativeEnum(DbErrorCode),
  }),
  // fsException
  z.object({
    message: z.string(),
    errorType: z.literal(ApiErrorType.FILESTATION_EXCEPTION),
    fileStationError: z.nativeEnum(FileStationError),
  }),
]);
//# sourceMappingURL=apiErrorResponse.js.map
