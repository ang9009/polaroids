import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
/**
 * Returns the corresponding DbErrorCode given an error code.
 * @param prismaError the Prisma Client error from a failed database request
 * @returns the corresponding DbErrorCode
 */
declare function getDbErrorType(prismaError: PrismaClientKnownRequestError): DbErrorCode;
export default getDbErrorType;
