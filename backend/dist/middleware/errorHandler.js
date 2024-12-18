/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
export const errorHandler = (err, req, res, next) => {
    console.log(err.getResponse());
    res.status(err.status).json(err.getResponse());
};
