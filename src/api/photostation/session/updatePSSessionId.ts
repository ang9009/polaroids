import axios from "axios";
import "process";
import { PSApiRoutes } from "../../../@types/api/PSApiRoutes";
import { LoginApiResponse } from "../../../@types/api/authApiResponses";
import { getPSApiUrlForRoute } from "../utils/getPSApiUrlForRoute";
import { getValidatedPSData } from "./getValidatedPSData";

/**
 * Logs into Photostation and gets a session id, then stores it in local storage.
 * @throws Error if API credentials are missing, login fails, or local storage
 *         is not available
 */
export const updatePSSessionId = async () => {
  const { PS_API_USERNAME, PS_API_PASSWORD } = process.env;
  const params = {
    method: "login",
    version: "1",
    username: PS_API_USERNAME,
    password: PS_API_PASSWORD,
  };
  const url = getPSApiUrlForRoute(PSApiRoutes.Auth);

  let loginData;
  try {
    const res = await axios.get(url, { params: params });
    loginData = getValidatedPSData<LoginApiResponse>(res);
  } catch (err) {
    throw new Error(`Failed to get session id: ${err}`);
  }

  const sessionId = loginData?.data?.sid;
  if (!sessionId) {
    throw new Error(`Unexpected response: ${JSON.stringify(loginData)}`);
  }

  if (localStorage) {
    global.localStorage.setItem("sessionId", sessionId);
  } else {
    throw new Error("Local storage is not available, failed to save session id");
  }
};
