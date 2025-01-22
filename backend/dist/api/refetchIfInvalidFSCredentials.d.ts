import { FSWebUploadResponse } from "../types/filestation/FSWebUploadResponse";
/**
 * Runs a given FileStation-related request again if the session id/syno token is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */
export declare const refetchIfInvalidFSCredentials: (
  fsRequest: () => Promise<FSWebUploadResponse>
) => Promise<FSWebUploadResponse>;
