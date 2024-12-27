import "dotenv/config";
/**
 * Creates a valid url for the database api. Note that adding extra segments
 * do not need to be preceded by slashes; just add the path's name by itself.
 * @param route the route in question
 * @param segments any additional segments in the path, such as path parameters
 * @returns the url constructed according to the given arguments
 * @throws Error if process.env.DB_API_URL is undefined
 */
export const getDbApiUrl = (route, ...segments) => {
    if (process.env.DB_API_URL === undefined) {
        throw Error("No DB_API_URL variable found in .env folder");
    }
    const baseRoute = process.env.DB_API_URL + route;
    return segments.length > 0 ? `${baseRoute}/${segments.join("/")}` : baseRoute;
};
//# sourceMappingURL=getDbApiUrl.js.map