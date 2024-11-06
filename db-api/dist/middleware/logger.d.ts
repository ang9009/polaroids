import { NextFunction, Request, Response } from "express";
/**
 * Logger function for incoming requests.
 * @param req request object
 * @param res response
 * @param next next function
 */
export declare const logger: (req: Request, res: Response, next: NextFunction) => void;
