/**
 * Returns a formatted PhotoStation API url, given the route and parameters
 * being used.
 * @param route the route being used
 * @param params the parameters
 * @returns a formatted API url with the route and parameters.
 */
const getValidApiUrl = (route, params) => {
    const { PS_API_URL } = process.env;
    return `${PS_API_URL}${route}&${params.toString()}`;
};
export default getValidApiUrl;
//# sourceMappingURL=getValidApiUrl.js.map