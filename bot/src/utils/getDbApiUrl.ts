import "dotenv/config";
import { DbApiRoutes } from "../types/api/DbApiRoutes";

/**
 * Creates a valid url for the database api.
 * @param route the route in question
 * @returns the url
 * @throws Error if process.env.DB_API_URL is undefined
 */
const getDbApiUrl = (route: DbApiRoutes) => {
  if (process.env.DB_API_URL == undefined) {
    const msg = "No DB_API_URL found in .env folder";
    console.error(msg);
    throw Error(msg);
  }
  return process.env.DB_API_URL + route;
};

export default getDbApiUrl;
