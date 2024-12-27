import { isDbExceptionResponse } from "./isDbExceptionResponse";
/**
 * Ensures that the given error is a DbExceptionResponse.
 * @param error the error in question
 * @returns DbExceptionResponse
 * @throws Error if the given error is not a DbExceptionResponse
 */
export const ensureDbExceptionResponse = (error) => {
    if (!isDbExceptionResponse(error)) {
        throw Error("An unknown error occurred while making a request to the database");
    }
    return error;
};
//# sourceMappingURL=ensureDbException.js.map