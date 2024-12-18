import { isAxiosError } from "axios";
import { ErrorResponseSchema } from "shared/src/responses/error/errorResponse";
/**
 * Calls a given callback functino if the provided error is an Axios error and a
 * ErrorResponse.
 * @param error the error in question
 * @param callback the callback function to be called
 */
export const callIfErrorResponse = (error, callback) => {
    if (isAxiosError(error)) {
        const parsedRes = ErrorResponseSchema.safeParse(error.response?.data);
        if (!parsedRes.success || !error.response) {
            throw error;
        }
        callback(parsedRes.data);
    }
};
//# sourceMappingURL=callIfDbException.js.map