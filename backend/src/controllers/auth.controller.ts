/* eslint-disable jsdoc/require-param */
import { NextFunction, Request, Response } from "express";
import { GetInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import HttpStatusCode from "../data/httpStatusCode";

/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/info
 */
export const getInfo = (req: Request, res: Response, next: NextFunction) => {
  const parsedUser = GetInfoResponseSchema.parse(req.user);
  res.status(HttpStatusCode.OK).json(parsedUser);
};
