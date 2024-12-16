import { ZodIssue } from "zod";
import { ErrorResponse } from "./errorResponse";

export interface ValidationExceptionResponse extends ErrorResponse {
  errors: ZodIssue[];
}
