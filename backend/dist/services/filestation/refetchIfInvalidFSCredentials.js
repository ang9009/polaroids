import { FileStationCredentials } from "./fileStationCredentials";
/**
 * Attempts to refresh the currently saved FileStation credentials if a given
 * FileStation request fails, then re-attempts the request.
 * @param fsRequest the request in question
 * @param validate a function that validates the result of the request
 * @returns the result of the request
 */
export const refetchIfInvalidFSCredentials = async (fsRequest, validate) => {
    for (let retries = 0; retries < 3; retries++) {
        const res = await fsRequest();
        if (validate(res)) {
            return res;
        }
        await FileStationCredentials.getInstance();
    }
    throw new Error("Failed to fetch valid session id");
};
