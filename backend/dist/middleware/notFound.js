import HttpStatusCode from "../data/statusCodes";
/**
 * Error handler for non-existent routes.
 * @param req request
 * @param res response
 * @param next next function
 */
export const notFound = (req, res, next) => {
    console.log("Route not found");
    res.status(HttpStatusCode.NOT_FOUND).json({ message: "Route could not be found" });
};
