import { NextFunction, Request, Response } from "express";
/**
 * Checks if the user/bot is authenticated.
 * @param req the request object
 * @param res the response object
 * @param next the next function
 */
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => any;
