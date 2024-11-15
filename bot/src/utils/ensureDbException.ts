import { DbExceptionResponse } from "shared/error-responses/dbExceptionResponse";

/**
 * Type predicate for DbExceptionResponse.
 * @param err the error in question
 * @returns whether it's a DbExceptionResponse
 */
const isDbExceptionResponse = (err: unknown): err is DbExceptionResponse => {
  return (
    (err as DbExceptionResponse).dbErrorCode !== undefined &&
    (err as DbExceptionResponse).message !== undefined &&
    (err as DbExceptionResponse).error !== undefined
  );
};

/**
 * Ensures that the given error is a DbExceptionResponse.
 * @param error the error in question
 * @returns DbExceptionResponse
 * @throws Error if the given error is not a DbExceptionResponse
 */
export const ensureDbExceptionResponse = (error: unknown): DbExceptionResponse => {
  if (!isDbExceptionResponse(error)) {
    throw Error("An unknown error occurred while making a request to the database");
  }

  return error as DbExceptionResponse;
};
