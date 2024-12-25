import { NextFunction, Request, Response } from "express";
import { HttpException } from "../types/error/httpException";

/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next the next function
 */
export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.getResponse());
  res.status(err.status).json(err.getResponse());
};
