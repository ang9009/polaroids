import { isAxiosError } from "axios";
import { GetUserInfoResponse, GetUserInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import { ApiRoutes } from "../data/apiRoutes";
import { apiClient } from "../lib/axios";

/**
 * Fetches data about the current user.
 * @returns {GetUserInfoResponse | null} a representation of the current user,
 * or null if the user is not logged in.
 */
export const getUserInfo = async (): Promise<GetUserInfoResponse | null> => {
  const { VITE_API_URL } = import.meta.env;
  let userInfo;
  try {
    userInfo = await apiClient.get(`${VITE_API_URL}${ApiRoutes.DiscordUserInfo}`);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.status === 403) {
        return null;
      }
    }
    throw err;
  }

  const parseUserInfo = GetUserInfoResponseSchema.safeParse(userInfo.data);
  if (!parseUserInfo.success) {
    throw Error("Failed to fetch user data");
  }
  return parseUserInfo.data;
};
