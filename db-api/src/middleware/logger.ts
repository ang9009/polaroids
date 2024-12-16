import colors, { Color } from "colors";
import { NextFunction, Request, Response } from "express";

/**
 * The four different types of HTTP methods that have special colors (green,
 * red, yellow, and red respectively).
 */
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const methodColors: Record<HttpMethod, Color> = {
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
export const logger = (req: Request, res: Response, next: NextFunction) => {
  const color = methodColors[req.method as HttpMethod] || colors.white;
  console.log(color(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));
  next();
};
