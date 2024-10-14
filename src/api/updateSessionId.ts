import "process";

/**
 * Logs into Photostation and gets a session id, then stores it in local storage.
 * @throws Error if login fails
 */
const updateSessionId = async () => {
  const loginRoute = "/auth.php?api=SYNO.PhotoStation.Auth";
  const params = `&method=login&version=1&username=${process.env.PS_API_USERNAME}&password=${process.env.PS_API_PASSWORD}`;
  const url = [process.env.PS_API_URL, loginRoute, params].join("");

  const res = await fetch(url);
  const loginData = await res.json();

  if (!loginData.success) {
    throw new Error("Failed to get session id: " + loginData.error.code);
  }

  const sessionId = loginData.data.sid;
  global.localStorage.setItem("sessionId", sessionId);
};

export default updateSessionId;
