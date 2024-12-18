import { AxiosResponse } from "axios";
/**
 * Runs a given FileStation-related request again if the session id is invalid.
 * @param fsRequest the FileStation request function
 * @returns the result of the request
 */
export declare const refetchIfStaleFSSessionId: (fsRequest: () => AxiosResponse) => Promise<AxiosResponse>;
