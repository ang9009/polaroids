import { AxiosError } from "axios";
/**
 * Type guard to check if the error is an AxiosError with a response.
 * @param err The error to check.
 * @returns True if the error is an AxiosError with a response, false otherwise.
 */
export function isAxiosErrorResponse(err) {
    return err instanceof AxiosError && !!err.response;
}
//# sourceMappingURL=ensureAxiosErrorResponse.js.map