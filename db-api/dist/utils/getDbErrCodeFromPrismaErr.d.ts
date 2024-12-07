import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbError } from "shared/src/error-codes/dbError";
/**
 * Maps prisma errors to their respective DbErrorCodes.
 * @param prismaError the Prisma error in question
 * @returns the corresponding DbErrorCode
 */
declare function getDbErrCodeFromPrismaErr(prismaError: PrismaClientKnownRequestError): DbError;
export default getDbErrCodeFromPrismaErr;
