/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { GetUserInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import HttpStatusCode from "../data/httpStatusCode";
import ValidationException from "../types/error/validationException";

/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/discord/info
 */
export const getInfo = (req: Request, res: Response, next: NextFunction) => {
  const parsedUser = GetUserInfoResponseSchema.safeParse(req.user);
  if (!parsedUser.success) {
    const error = new ValidationException(parsedUser.error);
    return next(error);
  }

  res.status(HttpStatusCode.OK).json(parsedUser.data);
};

/**
 * Logs out the currently logged in user.
 * Route: POST /api/auth/discord/logout
 */
export const discordLogout = (req: Request, res: Response, next: NextFunction) => {
  req.logout(() => {
    res.status(HttpStatusCode.OK).json({ message: "Successfully logged out" });
  });
};
