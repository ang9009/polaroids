import { DbExceptionResponse } from "shared/error-responses/dbExceptionResponse";
import { isDbExceptionResponse } from "./isDbExceptionResponse";

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
