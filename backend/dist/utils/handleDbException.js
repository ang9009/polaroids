import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import DbException from "../types/error/dbException";
import UnknownException from "../types/error/genericException";
/**
 * Handles database-related exceptions by associating them with an error and
 * forwarding them to middleware.
 * @param err the error in question
 * @param next the NextFunction
 * @returns void
 */
const handleDbException = (err, next) => {
    if (err instanceof PrismaClientKnownRequestError) {
        const error = new DbException(err);
        return next(error);
    }
    const error = new UnknownException("An unknown database-related exception occurred: " + err);
    return next(error);
};
export default handleDbException;
