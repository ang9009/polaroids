import { isAxiosError } from "axios";
import { GetUserInfoResponse, GetUserInfoResponseSchema } from "shared/src/responses/auth/getInfo";
import { ApiRoutes } from "../data/apiRoutes";
import { getAxios } from "../lib/axios";

export const getUserInfo = async (): Promise<GetUserInfoResponse | null> => {
  const { VITE_API_URL } = import.meta.env;
  let userInfo;
  try {
    userInfo = await getAxios(`${VITE_API_URL}${ApiRoutes.DiscordUserInfo}`);
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
