import NotFoundException from "../types/error/notFoundException";
/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
export const notFound = (req, res, next) => {
    const error = new NotFoundException();
    next(error);
};
