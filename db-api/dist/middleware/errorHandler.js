import colors from "colors";
/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
export const errorHandler = (err, req, res, next) => {
    console.error(colors.red(JSON.stringify(err.getResponse())));
    res.status(err.status).json(err.getResponse());
};
