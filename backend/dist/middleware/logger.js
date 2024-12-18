import colors from "colors";
const methodColors = {
    GET: colors.green,
    POST: colors.red,
    PUT: colors.yellow,
    DELETE: colors.red,
};
/**
 * Logger function for incoming requests.
 * @param req request object
 * @param res response
 * @param next next function
 */
export const logger = (req, res, next) => {
    const color = methodColors[req.method] || colors.white;
    console.log(color(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));
    next();
};
