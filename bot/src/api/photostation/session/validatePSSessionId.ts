import axios from "axios";
import { PSApiRoutes } from "../../../types/api/PSApiRoutes";
import { CheckAuthApiResponse } from "../../../types/api/authApiResponses";
import { getPSApiUrlForRoute } from "../utils/getPSApiUrlForRoute";
import { getValidatedPSData } from "./getValidatedPSData";

/**
 * Checks if the given PhotoStation6 sessionId is still valid
 * @param sessionId the sessionId in question
 * @returns whether the sessionId is valid
 * @throws Error if the get request fails
 */
export const validatePSSessionId = async (sessionId: string): Promise<boolean> => {
  const url = getPSApiUrlForRoute(PSApiRoutes.Auth);
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
    authData = getValidatedPSData<CheckAuthApiResponse>(res);
  } catch (err) {
    throw new Error(`Failed to validate session id: ${err}`);
  }

  if (!authData.data) {
    throw new Error(`Unexpected response: ${authData}`);
  }
  const { browse: canBrowse, upload: canUpload, manage: canManage } = authData.data.permission;

  return canBrowse && canUpload && canManage;
};
