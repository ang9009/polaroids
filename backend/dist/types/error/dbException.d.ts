import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { DbExceptionResponse } from "shared/src/responses/error//dbExceptionResponse";
import HttpStatusCode from "../../data/statusCodes";
import { HttpException } from "./httpException";
/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
declare class DbException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly dbErrorCode: DbErrorCode;
    readonly status: HttpStatusCode;
    /**
     * The constructor for a DbException.
     * @param prismaError the related Prisma Client error
     */
    constructor(prismaError: PrismaClientKnownRequestError);
    getResponse(): DbExceptionResponse;
}
export default DbException;
