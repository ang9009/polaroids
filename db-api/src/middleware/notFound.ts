import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/statusCodes";
import { ApiError } from "./errorHandler";

/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  const apiError: ApiError = { status: HttpStatusCode.NOT_FOUND, error: error };
  next(apiError);
};
