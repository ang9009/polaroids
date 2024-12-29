import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
import { DbErrorCode } from "../../error-codes/dbErrorCode";
export const DbExceptionResponseSchema = z.object({
    message: z.string(),
    errorType: z.literal(ApiErrorType.DB_EXCEPTION),
    dbErrorCode: z.nativeEnum(DbErrorCode),
});
//# sourceMappingURL=dbExceptionResponse.js.map