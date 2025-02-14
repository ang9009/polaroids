import { NextFunction, Request, Response } from "express";
/**
 * Universal error handler middleware.
 * @param err the error object
 * @param req request
 * @param res response
 * @param next the next function
 */
export declare const errorHandler: (err: unknown, req: Request, res: Response, next: NextFunction) => void;
