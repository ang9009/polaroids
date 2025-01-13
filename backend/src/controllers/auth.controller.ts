/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { GetInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/discordinfo
 */
export const getInfo = (req: Request, res: Response, next: NextFunction) => {
  const parsedUser = GetInfoResponseSchema.parse(req.user);
  res.status(HttpStatusCode.OK).json(parsedUser);
};

/**
 * Logs out the currently logged in user.
 * Route: POST /api/auth/discord/logout
 */
export const discordLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(() => {
    res.json({ message: "Successfully logged out" });
  });
};

/**
 * Verifies if the user is whitelisted. If not, this logs the user out.
 */
export const discordLogin = (req: Request, res: Response, next: NextFunction) => {
  res.redirect();
  // ! Check if the user is whitelisted
  // req.logout(() => {
  //   res.json({ message: "Successfully logged out" });
  // });
};
