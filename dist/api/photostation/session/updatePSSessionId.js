import axios from "axios";
import "process";
import { ApiRoutes } from "../../../@types/api/apiRoutes";
import getApiUrlForRoute from "../utils/getValidPSApiUrl";
import getValidatedPSData from "./getValidatedPSData";
/**
 * Logs into Photostation and gets a session id, then stores it in local storage.
 * @throws Error if API credentials are missing, login fails, or local storage
 *         is not available
 */
const updatePSSessionId = async () => {
    const { PS_API_USERNAME, PS_API_PASSWORD } = process.env;
    const loginRoute = ApiRoutes.Auth;
    const params = {
        method: "login",
        version: "1",
        username: PS_API_USERNAME,
        password: PS_API_PASSWORD,
    };
    const url = getApiUrlForRoute(loginRoute);
    let loginData;
    try {
        const res = await axios.get(url, { params: params });
        loginData = getValidatedPSData(res);
    }
    catch (err) {
        throw new Error(`Failed to get session id: ${err}`);
    }
    const sessionId = loginData?.data?.sid;
    if (!sessionId) {
        throw new Error(`Unexpected response: ${JSON.stringify(loginData)}`);
    }
    if (typeof localStorage !== "undefined") {
        global.localStorage.setItem("sessionId", sessionId);
    }
    else {
        throw new Error("Local storage is not available, failed to save session id");
    }
};
export default updatePSSessionId;
//# sourceMappingURL=updatePSSessionId.js.map