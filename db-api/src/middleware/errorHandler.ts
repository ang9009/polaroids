import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/statusCodes";

/**
 * Represents an API error, which has an optional status code and the Error object.
 */
export interface ApiError {
  status?: HttpStatusCode;
  error: Error;
}

/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ msg: err.error.message });
};
