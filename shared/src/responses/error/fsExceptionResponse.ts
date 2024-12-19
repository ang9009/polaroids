import { z } from "zod";
import { DbApiErrorType } from "../../error-codes/dbApiErrorType";
import { FileStationError } from "../../error-codes/fileStationError";

export const FSExceptionResponseSchema = z.object({
  message: z.string(),
  errorType: z.literal(DbApiErrorType.FILESTATION_EXCEPTION),
  fileStationError: z.nativeEnum(FileStationError),
});

export type FSExceptionResponse = z.infer<typeof FSExceptionResponseSchema>;
