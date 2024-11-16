import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction } from "express";
import DbException from "../types/error/dbException";
import GenericException from "../types/error/genericException";

/**
 * Handles database-related exceptions by associating them with an error and
 * forwarding them to middleware.
 * @param err the error in question
 * @param next the NextFunction
 * @returns void
 */
const handleDbException = (err: unknown, next: NextFunction): void => {
  if (err instanceof PrismaClientKnownRequestError) {
    const error = new DbException(err);
    return next(error);
  }
  const error = new GenericException("An unknown database-related exception occurred: " + err);
  return next(error);
};

export default handleDbException;
