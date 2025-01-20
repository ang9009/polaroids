/**
 * An API for interacting with FileStation.
 */
export declare class FileStation {
    /**
     * Uploads the given files to FileStation.
     * @param files the files to be uploaded
     */
    static uploadFilesToFS: (files: Express.Multer.File[]) => Promise<void>;
    /**
     * Uploads a singular file to FileStation.
     * @param file the file to be uploaded
     * @returns FileStation's response to the upload
     */
    private static uploadFile;
    /**
     * Retrieves a file from FileStation. The name of the file must follow the
     * format discordId.extension.
     * @param fileName the name of the file
     * @returns the desired file
     */
    static getFileFromFS: (fileName: string) => Promise<Buffer>;
    /**
     * Retrieves a temporary file sharing link for the file with the given name
     * from FileStation.
     * @param fileName the name of the file (must follow the format discordId.extension.)
     * @returns the file sharing link for the specified file
     */
    private static getFSFileSharingLink;
    /**
     * Attempts to refresh the currently saved FileStation credentials if a given
     * FileStation request fails (throws an error), then re-attempts the request.
     * Note that it is up to the caller to make the passed function throw an error.
     * @param fsRequest the request in question
     * @returns the result of the request
     */
    private static refetchIfInvalidFSCredentials;
}
