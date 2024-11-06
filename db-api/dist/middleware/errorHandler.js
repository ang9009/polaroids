"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const colors_1 = require("colors");
/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
const errorHandler = (err, req, res, next) => {
    console.error((0, colors_1.red)(JSON.stringify(err.getResponse())));
    res.status(err.status).json(err.getResponse());
};
exports.errorHandler = errorHandler;
