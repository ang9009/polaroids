import "process";

/**
 * Logs into FileStation and gets a session id, then stores it in local storage.
 * @throws Error if API credentials are missing, login fails, or local storage
 *         is not available
 */
export const updateFSSessionId = async () => {
  const { PS_API_USERNAME, PS_API_PASSWORD } = process.env;
  const params = {
    method: "login",
    version: "1",
    username: PS_API_USERNAME,
    password: PS_API_PASSWORD,
  };
};
