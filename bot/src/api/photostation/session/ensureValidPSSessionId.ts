import { updatePSSessionId } from "./updatePSSessionId";
import { validatePSSessionId } from "./validatePSSessionId";

/**
 * Checks if the saved FileStation session ID is valid/if there is one, and
 * updates it if it does not exist/it is not valid.
 */
export const ensureValidPSSessionId = async () => {
  const sessionId = global.localStorage.getItem("sessionId");

  // If the session id exists, check if it's valid. If it's valid, return immediately
  if (sessionId) {
    const sessionIsValid = await validatePSSessionId(sessionId);
    if (sessionIsValid) {
      console.log(`Using saved session ID as it is still valid: ${sessionId}`);
      return;
    } else {
      console.log(`Saved session ID ${sessionId} has become stale. Retrieving new session ID...`);
    }
  }

  // If the session id doesn't exist/it is not valid, update it
  await updatePSSessionId();
  console.log(`Successfully retrieved session ID: ${global.localStorage.getItem("sessionId")}`);
};
