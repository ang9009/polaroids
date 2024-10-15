import axios from "axios";
import { ApiRoutes } from "../@types/apiRoutes";
import getValidApiUrl from "../utils/getValidApiUrl";
/**
 * Checks if the given sessionId is still valid
 * @param sessionId the sessionId in question
 * @returns whether the sessionId is valid
 */
const sessionIdIsValid = async (sessionId) => {
    const route = ApiRoutes.Auth;
    const params = new URLSearchParams({
        method: "checkauth",
    });
    const url = getValidApiUrl(route, params);
    console.log(url, sessionId);
    try {
        const res = await axios.request({
            url: url,
            headers: {
                Cookie: `PHPSESSID=${sessionId}`,
            },
        });
        console.log(res.data);
    }
    catch (error) {
        console.log(`Checkauth request failed: ${error}`);
    }
    // !CHANGE THIS
    return false;
};
export default sessionIdIsValid;
//# sourceMappingURL=sessionIdIsValid.js.map