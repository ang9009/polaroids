/**
 * Attempts to refresh the currently saved FileStation credentials if a given
 * FileStation request fails, then re-attempts the request.
 * @param fsRequest the request in question
 * @param validate a function that validates the result of the request
 * @returns the result of the request
 */
export declare const refetchIfInvalidFSCredentials: <T>(fsRequest: () => Promise<T>, validate: (res: unknown) => boolean) => Promise<T>;
