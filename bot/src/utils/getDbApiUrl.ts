import "dotenv/config";
import { DbApiRoutes } from "../data/dbApiRoutes";

/**
 * Creates a valid url for the database api.
 * @param route the route in question
 * @param segments any additional segments in the path, such as path parameters
 * @returns the url constructed according to the given arguments
 * @throws Error if process.env.DB_API_URL is undefined
 */
export const getDbApiUrl = (route: DbApiRoutes, ...segments: string[]) => {
  if (process.env.DB_API_URL == undefined) {
    const msg = "No DB_API_URL found in .env folder";
    console.error(msg);
    throw Error(msg);
  }
  const baseRoute = process.env.DB_API_URL + route;

  return segments.length > 0 ? `${baseRoute}/${segments.join("/")}` : baseRoute;
};
