import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

/**
 * An error related to the Prisma client.
 */
type PrismaClientError =
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError
  | PrismaClientRustPanicError
  | PrismaClientInitializationError
  | PrismaClientValidationError;

/**
 * Type guard for PrismaClientError.
 * @param error the error object in question
 * @returns whether the error is a PrismaClientError
 */
function isPrismaClientError(error: unknown): error is PrismaClientError {
  return (
    error instanceof PrismaClientKnownRequestError ||
    error instanceof PrismaClientUnknownRequestError ||
    error instanceof PrismaClientRustPanicError ||
    error instanceof PrismaClientInitializationError ||
    error instanceof PrismaClientValidationError
  );
}

export { isPrismaClientError, PrismaClientError };
