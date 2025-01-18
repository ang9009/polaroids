import { FSResponse } from "../../types/filestation/FSResponse";
import { FileStationCredentials } from "./fileStationCredentials";

/**
 * Runs a given FileStation-related request again if the session id/syno token is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */

// ! Use generic here.. specify return type (don't have catch all FSResponse)
/**
 *
 * @param fsRequest
 */
export const refetchIfInvalidFSCredentials = async (
  fsRequest: () => Promise<FSResponse>
): Promise<FSResponse> => {
  for (let retries = 0; retries < 3; retries++) {
    const res = await fsRequest();

    if (res instanceof File || res.success) {
      return res;
    } else if (res.errno.key === "error_noprivilege") {
      await FileStationCredentials.getInstance();
    } else {
      throw new Error("An unknown FileStation error occurred: " + res.errno.key);
    }
  }

  throw new Error("Failed to fetch valid session id");
};
