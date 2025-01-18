/**
 * Retrieves a file from FileStation. The name of the file must follow the
 * format discordId.extension.
 * @param fileName the name of the file
 * @returns the desired file
 */
export declare const getFileFromFS: (fileName: string) => Promise<File>;
