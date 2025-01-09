import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/httpStatusCode";
import { HttpExceptionSchema } from "../types/error/httpException";

/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next the next function
 */
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const parseErr = HttpExceptionSchema.safeParse(err);
  if (parseErr.success) {
    const { status, getResponse } = parseErr.data;
    res.status(status).json(getResponse());
    return;
  } else if (err instanceof Error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(err.message);
    return;
  }

  console.error(err);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send("An unknown error occurred.");
};
