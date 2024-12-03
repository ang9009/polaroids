import { AxiosResponse } from "axios";
import { FileStationResponseSchema } from "../types/response-schemas/FileStationResponse";
import { updateFSSessionId } from "./updateFSSessionId";

/**
 * Runs a given FileStation-related request again if the session id is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */
export const refetchIfStaleFSSessionId = async (
  fsRequest: () => AxiosResponse
): Promise<AxiosResponse> => {
  for (let retries = 0; retries < 3; retries++) {
    const res = await fsRequest();
    const resData = FileStationResponseSchema.safeParse(res.data);

    // If the response is an error and there is session timeout, refetch
    if (resData.success && resData.data.error.code === 106) {
      await updateFSSessionId();
    } else {
      return res;
    }
  }

  throw new Error("Failed to fetch a valid session id after 3 retries.");
};
