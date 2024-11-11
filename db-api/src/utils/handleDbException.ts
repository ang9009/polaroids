import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction } from "express";
import DbException from "../types/error/dbException";
import GenericException from "../types/error/genericException";

const handleDbException = (err: unknown, next: NextFunction) => {
  if (err instanceof PrismaClientKnownRequestError) {
    const error = new DbException(err);
    return next(error);
  }
  const error = new GenericException("An unknown database-related exception occurred: " + err);
  return next(error);
};

export default handleDbException;