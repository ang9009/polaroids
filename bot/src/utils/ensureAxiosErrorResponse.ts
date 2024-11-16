import { AxiosError, AxiosResponse } from "axios";

/**
 * Type guard to check if the error is an AxiosError with a response.
 * @param err The error to check.
 * @returns True if the error is an AxiosError with a response, false otherwise.
 */
export function isAxiosErrorResponse(
  err: unknown,
): err is AxiosError & { response: AxiosResponse } {
  return err instanceof AxiosError && !!err.response;
}
