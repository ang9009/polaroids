import { isAxiosError } from "axios";
import { FileStationCredentials } from "./fileStationCredentials";

/**
 * Attempts to refresh the currently saved FileStation credentials if a given
 * FileStation request fails (throws an error), then re-attempts the request.
 * @param fsRequest the request in question
 * @returns the result of the request
 */
export const refetchIfInvalidFSCredentials = async <T>(fsRequest: () => Promise<T>): Promise<T> => {
  let error;

  for (let retries = 0; retries < 3; retries++) {
    try {
      return await fsRequest();
    } catch (err) {
      error = err;
      await FileStationCredentials.getInstance();
    }
  }

  if (isAxiosError(error)) {
    throw error;
  }
  throw new Error("Request failed: " + error);
};
