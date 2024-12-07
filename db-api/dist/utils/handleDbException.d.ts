import { NextFunction } from "express";
/**
 * Handles database-related exceptions by associating them with an error and
 * forwarding them to middleware.
 * @param err the error in question
 * @param next the NextFunction
 * @returns void
 */
declare const handleDbException: (err: unknown, next: NextFunction) => void;
export default handleDbException;
