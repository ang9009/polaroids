import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/statusCodes";
import { HttpException } from "../types/apiError";

/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpException(HttpStatusCode.NOT_FOUND, "Not found");
  next(error);
};
