import { FSWebUploadResponse } from "../types/response-schemas/FSWebUploadResponse";
import { updateFSCredentials } from "./updateFSCredentials";

/**
 * Runs a given FileStation-related request again if the session id/syno token is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */
export const refetchIfInvalidFSCredentials = async (
  fsRequest: () => Promise<FSWebUploadResponse>
): Promise<FSWebUploadResponse> => {
  for (let retries = 0; retries < 3; retries++) {
    const res = await fsRequest();

    if (res.success) {
      return res;
    } else if (res.errno.key === "error_noprivilege") {
      await updateFSCredentials();
    } else {
      throw new Error("An unknown FileStation error occurred: " + res.errno.key);
    }
  }

  throw new Error("Failed to fetch valid session id");
};
