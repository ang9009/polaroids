import "dotenv/config";
/**
 * A singleton class that holds the session id and syno token.
 */
export declare class FileStationCredentials {
    private static instance;
    readonly sessionId: string;
    readonly synoToken: string;
    /**
     * The constructor for a FileStationCredentials object.
     * @param sessionId a valid FileStation session id
     * @param synoToken a valid FileStation auth token
     */
    private constructor();
    /**
     * Returns the singleton instance of FileStationCredentials.
     * @returns the singleton instance of FileStationCredentials
     */
    static getInstance(): Promise<FileStationCredentials>;
    /**
     * Retrieves a valid FileStation session id and SYNO token pair.
     * @returns a FileStationCredentials object containing a valid session id and
     * SYNO token
     */
    private static getFSCredentials;
    /**
     * Retrieves the session id by getting it from the browser's cookies.
     * @param browser the browser used to login
     * @returns the session id
     */
    private static getSessionId;
    /**
     * Determines whether a response is a SynoTokenResponse.
     * @param synoTokenRes the response object in question
     * @returns whether it is a SynoTokenResponse
     */
    private static isSynoTokenResponse;
    /**
     * Retrieves the SYNO token response, which is received after logging in successfully.
     * @param page the login page
     * @returns the syno token
     */
    private static getSynoToken;
    /**
     * Fills out and submits the login form on the login page.
     * @param page the login page
     */
    private static submitLoginForm;
}
