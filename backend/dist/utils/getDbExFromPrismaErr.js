import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import DbException from "../types/error/dbException";
import UnknownException from "../types/error/unknownException";
/**
 * Provides a appropriate database-related exception based on an error object
 * thrown by Prisma. If the error object is a Prisma Client error, a DbException
 * is thrown. Otherwise, a GenericException is thrown.
 * @param err the error object in question
 * @returns an appropriate exception
 */
export const getDbExFromPrismaErr = (err) => {
    if (err instanceof PrismaClientKnownRequestError) {
        return new DbException(err);
    }
    return new UnknownException("An unknown database-related exception occurred: " + err);
};
