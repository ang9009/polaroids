import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { DbExceptionResponse } from "shared/src/responses/error/dbExceptionResponse";
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
      errorType: ApiErrorType.DB_EXCEPTION,
      message: this.message,
      dbErrorCode: this.dbErrorCode,
    };
  }
}

export default DbException;
