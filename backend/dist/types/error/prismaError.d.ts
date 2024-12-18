import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
/**
 * An error related to the Prisma client.
 */
type PrismaClientError = PrismaClientKnownRequestError | PrismaClientUnknownRequestError | PrismaClientRustPanicError | PrismaClientInitializationError | PrismaClientValidationError;
/**
 * Type guard for PrismaClientError.
 * @param error the error object in question
 * @returns whether the error is a PrismaClientError
 */
declare function isPrismaClientError(error: unknown): error is PrismaClientError;
export { isPrismaClientError, PrismaClientError };
