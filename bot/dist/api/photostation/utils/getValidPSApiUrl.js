/**
 * Returns a formatted PhotoStation API url given the route used. Note that this
 * url does not include the parameters, which have to be managed separately.
 * @param route the route being used
 * @returns a formatted API url with the route.
 * @throws Error if the route argument is null
 */
const getApiUrlForRoute = (route) => {
    if (route == null) {
        throw Error("Route argument was null");
    }
    const { PS_API_URL } = process.env;
    return `${PS_API_URL}${route}`;
};
export default getApiUrlForRoute;
//# sourceMappingURL=getValidPSApiUrl.js.map