"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({ msg: err.error.message });
};
exports.errorHandler = errorHandler;
