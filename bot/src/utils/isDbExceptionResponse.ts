import { DbExceptionResponse } from "shared/src/responses/error//dbExceptionResponse";

/**
 * Type predicate for DbExceptionResponse.
 * @param err the error in question
 * @returns whether it's a DbExceptionResponse
 */
export const isDbExceptionResponse = (err: unknown): err is DbExceptionResponse => {
  return (
    (err as DbExceptionResponse).dbErrorCode !== undefined &&
    (err as DbExceptionResponse).message !== undefined &&
    (err as DbExceptionResponse).error !== undefined
  );
};
