import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Checks if the user is authenticated.
 * @param req the request object
 * @param res the response object
 * @param next the next function
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(HttpStatusCode.FORBIDDEN).json({ message: "User is not logged in" });
};
