import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import DbException from "../types/error/dbException";
import GenericException from "../types/error/genericException";
import { HttpException } from "../types/error/httpException";

/**
 * Provides a appropriate database-related exception based on an error object
 * thrown by Prisma. If the error object is a Prisma Client error, a DbException
 * is thrown. Otherwise, a GenericException is thrown.
 * @param err the error object in question
 * @returns an appropriate exception
 */
const getDbExceptionFromPrismaErr = (err: unknown): HttpException => {
  if (err instanceof PrismaClientKnownRequestError) {
    return new DbException(err);
  }
  return new GenericException("An unknown database-related exception occurred: " + err);
};

export default getDbExceptionFromPrismaErr;
