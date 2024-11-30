import axios from "axios";
import "dotenv/config";
import { setValue } from "node-global-storage";
import { FileStationAuthResSchema } from "../types/response-schemas/FileStationAuthRes";

/**
 * Updates the FileStation session id stored in localstorage.
 */
export const updateFSSessionId = async () => {
  const { FS_API_URL, FS_API_USERNAME, FS_API_PASSWORD, FS_SID_KEY } = process.env;
  const url =
    `${FS_API_URL}/auth.cgi?api=SYNO.API.Auth&version=3&method=login` +
    `&account=${FS_API_USERNAME}&passwd=${FS_API_PASSWORD}`;

  const res = await axios.get(url); // It's ok if this throws an error
  const data = res.data;
  if (!data.success) {
    throw Error("Could not get session id");
  }

  const authData = FileStationAuthResSchema.safeParse(data);
  if (!authData.success) {
    throw Error("Failed to parse response from FileStation");
  }
  const sessionId = authData.data.data.sid;
  if (!FS_SID_KEY) {
    throw Error("Session id key was not found in .env");
  }
  setValue(FS_SID_KEY, sessionId);
};
