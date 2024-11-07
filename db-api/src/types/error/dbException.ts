import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import DbApiErrorType from "shared/error-codes/DbApiErrorCode";
import DbErrorCode from "shared/error-codes/DbErrorCode";
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

  constructor(prismaError: PrismaClientKnownRequestError) {
    this.name = "DbException";
    this.message = prismaError.message;
    this.dbErrorCode = getDbErrorType(prismaError);
  }

  getResponse(): DbExceptionResponse {
    return {
      error: DbApiErrorType.DB_EXCEPTION,
      message: this.message,
      dbErrorCode: this.dbErrorCode,
    };
  }
}

export default DbException;
