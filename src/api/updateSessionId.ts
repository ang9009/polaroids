import axios from "axios";
import "process";
import { ApiRoutes } from "../@types/api/apiRoutes";
import { LoginApiResponse } from "../@types/api/authApiResponses";
import getApiUrlForRoute from "../utils/getValidApiUrl";

/**
 * Logs into Photostation and gets a session id, then stores it in local storage.
 * @throws Error if API credentials are missing, login fails, or local storage
 *         is not available
 */
const updateSessionId = async () => {
  const { PS_API_URL, PS_API_USERNAME, PS_API_PASSWORD } = process.env;
  if (!PS_API_URL || !PS_API_USERNAME || !PS_API_PASSWORD) {
    throw new Error("Missing API credentials in environment variables.");
  }

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
    loginData = res.data as LoginApiResponse;
  } catch (err) {
    throw new Error(`Failed to get session id: ${err}`);
  }

  const sessionId = loginData?.data?.sid;
  if (!sessionId) {
    throw new Error(`Unexpected response: ${JSON.stringify(loginData)}`);
  }

  if (typeof localStorage !== "undefined") {
    global.localStorage.setItem("sessionId", sessionId);
  } else {
    throw new Error(
      "Local storage is not available, failed to save session id"
    );
  }
};

export default updateSessionId;
