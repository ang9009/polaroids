import { NextFunction, Request, Response } from "express";
import { HttpException } from "../types/apiError";

/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next next function
 */
export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  res.status(err.status || 500).json({ message: err.message });
};
