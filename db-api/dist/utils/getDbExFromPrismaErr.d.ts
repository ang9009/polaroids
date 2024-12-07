import { HttpException } from "../types/error/httpException";
/**
 * Provides a appropriate database-related exception based on an error object
 * thrown by Prisma. If the error object is a Prisma Client error, a DbException
 * is thrown. Otherwise, a GenericException is thrown.
 * @param err the error object in question
 * @returns an appropriate exception
 */
export declare const getDbExFromPrismaErr: (err: unknown) => HttpException;
