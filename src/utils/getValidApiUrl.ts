import { ApiRoutes } from "../@types/api/apiRoutes";

/**
 * Returns a formatted PhotoStation API url given the route used. Note that this
 * url does not include the parameters, which have to be managed separately.
 * @param route the route being used
 * @returns a formatted API url with the route.
 */
const getApiUrlForRoute = (route: ApiRoutes): string => {
  const { PS_API_URL } = process.env;

  return `${PS_API_URL}${route}`;
};

export default getApiUrlForRoute;
