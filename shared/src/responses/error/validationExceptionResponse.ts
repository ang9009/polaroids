import { ZodIssue } from "zod";
import { DbApiErrorType } from "../../error-codes/dbApiErrorType";

export type ValidationExceptionResponse = {
  errors: ZodIssue[];
  message: string;
  errorType: DbApiErrorType.REQUEST_EXCEPTION;
};
