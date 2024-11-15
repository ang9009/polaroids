import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DbApiErrorType } from "shared/error-codes/dbApiErrorType";
import { DbErrorCode } from "shared/error-codes/dbErrorCode";
import { DbExceptionResponse } from "shared/error-responses/dbExceptionResponse";
import HttpStatusCode from "../../data/statusCodes";
import getDbErrorType from "../../utils/getDbErrorType";
import { HttpException } from "./httpException";

/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
class DbException implements HttpException {
  readonly name: string;
  readonly message: string;
  readonly dbErrorCode: DbErrorCode;
  readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

  /**
   * The constructor for a DbException.
   * @param prismaError the related Prisma Client error
   */
  constructor(prismaError: PrismaClientKnownRequestError) {
    this.name = "DbException";
    this.message = prismaError.message;
    this.dbErrorCode = getDbErrorType(prismaError);
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  getResponse(): DbExceptionResponse {
    return {
      error: DbApiErrorType.DB_EXCEPTION,
      message: this.message,
      dbErrorCode: this.dbErrorCode,
    };
  }
}

export default DbException;
