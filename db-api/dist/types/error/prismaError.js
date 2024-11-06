"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrismaClientError = isPrismaClientError;
const library_1 = require("@prisma/client/runtime/library");
/**
 * Type guard for PrismaClientError.
 * @param error the error object in question
 * @returns whether the error is a PrismaClientError
 */
function isPrismaClientError(error) {
    return (error instanceof library_1.PrismaClientKnownRequestError ||
        error instanceof library_1.PrismaClientUnknownRequestError ||
        error instanceof library_1.PrismaClientRustPanicError ||
        error instanceof library_1.PrismaClientInitializationError ||
        error instanceof library_1.PrismaClientValidationError);
}
