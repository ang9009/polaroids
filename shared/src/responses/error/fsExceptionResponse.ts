import { z } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";
import { FileStationError } from "../../error-codes/fileStationError";

export const FSExceptionResponseSchema = z.object({
  message: z.string(),
  errorType: z.literal(ApiErrorType.FILESTATION_EXCEPTION),
  fileStationError: z.nativeEnum(FileStationError),
});

export type FSExceptionResponse = z.infer<typeof FSExceptionResponseSchema>;
