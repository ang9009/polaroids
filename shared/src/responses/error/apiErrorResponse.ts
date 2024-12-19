import { z } from "zod";
import { DbExceptionResponseSchema } from "./dbExceptionResponse";
import { FSExceptionResponseSchema } from "./fsExceptionResponse";
import { UnknownExceptionResponseSchema } from "./unknownExceptionResponse";

export const ApiErrorResponseSchema = z.discriminatedUnion("errorType", [
  DbExceptionResponseSchema,
  FSExceptionResponseSchema,
  UnknownExceptionResponseSchema,
]);

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
