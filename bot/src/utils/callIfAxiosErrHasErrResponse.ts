import { isAxiosError } from "axios";
import { ErrorResponse, ErrorResponseSchema } from "shared/src/responses/error/errorResponse";

/**
 * Calls a given callback function if the provided error is an Axios error and a
 * ErrorResponse.
 * @param error the error in question
 * @param callback the callback function to be called
 */
export const callIfAxiosErrHasErrResponse = (
  error: unknown,
  callback: (errorRes: ErrorResponse) => void,
) => {
  if (isAxiosError(error)) {
    const parsedRes = ErrorResponseSchema.safeParse(error.response?.data);
    if (!parsedRes.success || !error.response) {
      throw error;
    }
    callback(parsedRes.data);
  }
};
