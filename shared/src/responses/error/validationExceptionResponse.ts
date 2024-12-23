import { ZodIssue } from "zod";
import { ApiErrorType } from "../../error-codes/apiErrorType";

export type ValidationExceptionResponse = {
  errors: ZodIssue[];
  message: string;
  errorType: ApiErrorType.REQUEST_EXCEPTION;
};
