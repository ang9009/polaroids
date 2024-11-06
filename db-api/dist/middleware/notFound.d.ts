import { NextFunction, Request, Response } from "express";
/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
export declare const notFound: (req: Request, res: Response, next: NextFunction) => void;
