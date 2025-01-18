/* eslint-disable jsdoc/require-returns */
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Checks if the user/bot is authenticated.
 * @param req the request object
 * @param res the response object
 * @param next the next function
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  // If there is an authorization header, the request is coming from the bot
  if (req.headers.authorization) {
    return passport.authenticate("headerapikey", {
      session: false,
    })(req, res, next);
  }

  // Otherwise, check if the user is authenticated via other means (Discord)
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(HttpStatusCode.FORBIDDEN).json({ message: "User is not logged in" });
};
