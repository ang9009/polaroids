/* eslint-disable jsdoc/require-returns */
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Checks if the user is authenticated.
 * @param req the request object
 * @param res the response object
 * @param next the next function
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return passport.authenticate("headerapikey", {
      session: false,
    })(req, res, next);
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.status(HttpStatusCode.FORBIDDEN).json({ message: "User is not logged in" });
};
