import { isAxiosError } from "axios";
import { apiClient } from "../lib/axios";
import { ApiRoutes } from "./../data/apiRoutes";

/**
 * Logs the current user out.
 */
export const logout = async () => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}${ApiRoutes.DiscordLogout}`;
  try {
    await apiClient.post(url);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.status === 403) {
        throw Error("User is currently not logged in");
      }
    }
    throw err;
  }
};
