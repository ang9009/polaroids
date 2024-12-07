import { FSApiRoute } from "../data/fsApiRoute";
/**
 * Returns a formatted FileStation API url given the route used. Note that this
 * url does not include the parameters, which have to be managed separately.
 * @param route the route being used
 * @returns a formatted API url with the route.
 * @throws Error if the route argument is null
 */
export declare const getFSApiUrlForRoute: (route: FSApiRoute) => string;
