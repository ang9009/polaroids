import axios from "axios";
import "dotenv/config";
import { setValue } from "node-global-storage";
import { FileStationAuthDataSchema } from "../types/response-schemas/FileStationAuthRes";
import { validateFSResponse } from "../utils/validateFSResponse";

/**
 * Updates the FileStation session id stored in localstorage.
 */
export const updateFSSessionId = async () => {
  const { FS_API_URL, FS_API_USERNAME, FS_API_PASSWORD, FS_SESSION_ID_KEY } = process.env;
  if (!FS_SESSION_ID_KEY) {
    throw Error("Session id key was not found in .env");
  }

  console.log("Updating session id...");
  const url =
    `${FS_API_URL}/auth.cgi?api=SYNO.API.Auth&version=3&method=login` +
    `&account=${FS_API_USERNAME}&passwd=${FS_API_PASSWORD}`;
  console.log(url);
  const res = await axios.get(url);
  const { sid } = validateFSResponse(res, FileStationAuthDataSchema);
  setValue(FS_SESSION_ID_KEY, sid);

  console.log("Successfully updated session id");
};
