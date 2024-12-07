import { AxiosResponse } from "axios";
import { FileStationResponseSchema } from "../types/response-schemas/FileStationResponse";
import { updateFSCredentials } from "./updateFSCredentials";

/**
 * Runs a given FileStation-related request again if the session id is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */
export const refetchIfStaleFSSessionId = async (
  fsRequest: () => AxiosResponse
): Promise<AxiosResponse> => {
  for (let retries = 0; retries < 2; retries++) {
    const res = await fsRequest();
    const parsedRes = FileStationResponseSchema.safeParse(res.data);

    if (!parsedRes.success) {
      throw Error(`Got unexpected response from FileStation: ${res.data}`);
    }
    const resData = parsedRes.data;
    // If the response is an error and there is session timeout, refetch
    if (resData.success && resData.data.error.code === 106) {
      await updateFSCredentials();
    } else {
      return res;
    }
  }

  throw new Error("Failed to fetch valid session id");
};
