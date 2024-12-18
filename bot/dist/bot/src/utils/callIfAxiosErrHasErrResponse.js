import { isAxiosError } from "axios";
import { ErrorResponseSchema } from "shared/src/responses/error/errorResponse";
/**
 * Calls a given callback function if the provided error is an Axios error and a
 * ErrorResponse.
 * @param error the error in question
 * @param callback the callback function to be called
 */
export const callIfAxiosErrHasErrResponse = (error, callback) => {
    if (isAxiosError(error)) {
        const parsedRes = ErrorResponseSchema.safeParse(error.response?.data);
        if (!parsedRes.success || !error.response) {
            throw error;
        }
        callback(parsedRes.data);
    }
};
//# sourceMappingURL=callIfAxiosErrHasErrResponse.js.map