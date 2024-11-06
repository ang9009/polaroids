import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";
import { PrismaClientError } from "./prismaError";
/**
 * Represents when something goes wrong with a call using the Prisma client.
 */
declare class DbException implements HttpException {
    readonly name: string;
    readonly message: string;
    readonly status: HttpStatusCode;
    constructor(prismaError: PrismaClientError);
    getResponse(): {
        [key: string]: string;
    };
}
export default DbException;
