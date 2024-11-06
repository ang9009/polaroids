import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";
import { PrismaClientError } from "./prismaError";

/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
class DbException implements HttpException {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

  public constructor(prismaError: PrismaClientError) {
    this.name = "DbException";
    this.message = prismaError.message;
  }

  public getResponse(): { [key: string]: string } {
    return { message: this.message };
  }
}

export default DbException;
