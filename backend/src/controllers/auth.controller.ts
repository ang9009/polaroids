/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { GetUserInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/discord/info
 */
export const getInfo = (req: Request, res: Response, next: NextFunction) => {
  const parsedUser = GetUserInfoResponseSchema.parse(req.user);
  res.status(HttpStatusCode.OK).json(parsedUser);
};

/**
 * Logs out the currently logged in user.
 * Route: POST /api/auth/discord/logout
 */
export const discordLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(() => {
    res.redirect(process.env.WEBSITE_LOGIN_URL!);
  });
};
