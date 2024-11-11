import { AxiosError, AxiosResponse } from "axios";

/**
 * Ensures that a given error is an AxiosError with a response. If it is not an
 * AxiosError, this will throw an appropriate Error. If there is no response,
 * it will also throw an appropriate error. Otherwise, it will return the error
 * as an AxiosError.
 *
 * This function is meant to be used when making an Axios request.
 * @param err the error object in question
 * @returns the given error as an AxiosError
 */
function ensureAxiosErrorResponse(err: unknown): AxiosError & { response: AxiosResponse } {
  if (!(err instanceof AxiosError)) {
    throw new Error("An unknown error occurred while trying to make a request.");
  } else if (!err.response) {
    throw new Error("Polaroids could not reach its server.");
  }

  return err as AxiosError & { response: AxiosResponse };
}

export { ensureAxiosErrorResponse };
