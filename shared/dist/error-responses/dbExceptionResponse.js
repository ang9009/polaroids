/**
 * Type guard for DbExceptionResponse.
 * @param err the error object
 * @returns whether err is a DbExceptionResponse
 */
const isDbExceptionResponse = (err) => {
    return "dbErrorCode" in err && "message" in err && "error" in err;
};
export { isDbExceptionResponse };
//# sourceMappingURL=dbExceptionResponse.js.map