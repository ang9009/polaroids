import { NextFunction, Request, Response } from "express";
/**
 * Returns information regarding the user who is currently logged in. This
 * assumes that there is a logged in user.
 * Route: GET /api/auth/discord/info
 */
export declare const getInfo: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Logs out the currently logged in user.
 * Route: POST /api/auth/discord/logout
 */
export declare const discordLogout: (req: Request, res: Response, next: NextFunction) => void;
