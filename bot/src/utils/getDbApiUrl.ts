import "dotenv/config";
import { DbApiRoutes } from "../types/api/dbApiRoutes";

/**
 * Creates a valid url for the database api.
 * @param route the route in question
 * @returns the url
 */
const getDbApiUrl = (route: DbApiRoutes) => {
  return process.env.DB_API_URL + route;
};

export default getDbApiUrl;
