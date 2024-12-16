/**
 * Type predicate for DbExceptionResponse.
 * @param err the error in question
 * @returns whether it's a DbExceptionResponse
 */
export const isDbExceptionResponse = (err) => {
    return (err.dbErrorCode !== undefined &&
        err.message !== undefined &&
        err.error !== undefined);
};
//# sourceMappingURL=isDbExceptionResponse.js.map