import "process";

/**
 * The shape of the response from Photostation's authentication API.
 */
interface authResponse {
  success: boolean;
  error?: {
    code: string;
  };
  data?: {
    sid: string;
  };
}

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

  const loginRoute = "/auth.php?api=SYNO.PhotoStation.Auth";
  const params = new URLSearchParams({
    method: "login",
    version: "1",
    username: PS_API_USERNAME,
    password: PS_API_PASSWORD,
  });
  const url = `${PS_API_URL}${loginRoute}&${params.toString()}`;

  const res = await fetch(url);
  const loginData = (await res.json()) as authResponse;
  let sessionId;

  if (!loginData.success && loginData.error) {
    throw new Error(`Failed to get session id: ${loginData.error.code}`);
  } else if (loginData.data) {
    sessionId = loginData.data.sid;
  } else {
    throw new Error(`Received unexpected auth response shape: ${loginData}`);
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
