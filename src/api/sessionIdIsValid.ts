import axios from "axios";
import { LoginApiResponse } from "../@types/api/authApiResponses";
import { ApiRoutes } from "../@types/api/apiRoutes";
import getApiUrlForRoute from "../utils/getValidApiUrl";

/**
 * Checks if the given sessionId is still valid
 * @param sessionId the sessionId in question
 * @returns whether the sessionId is valid
 */
const sessionIdIsValid = async (sessionId: string): Promise<boolean> => {
  const url = getApiUrlForRoute(ApiRoutes.Auth);
  const params = {
    method: "checkauth",
    version: 1,
  };
  const headers = {
    Cookie: `PHPSESSID=${sessionId}`,
  };

  let authData;
  try {
    const res = await axios.get(url, { params, headers });
    authData = res.data as LoginApiResponse;
  } catch (err) {
    throw new Error(`Failed to validate session id: ${err}`);
  }

  // ! Finish the authApiResponses file
  // !Check if the query methods are clean

  const isValid = authData?.data?.
  if (!authData.data) {
    throw new Error(`Unexpected response: ${authData}`);
  }

  return authData.data;
};

export default sessionIdIsValid;
