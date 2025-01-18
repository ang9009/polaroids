import { GetFilesRequest } from "shared/src/requests/files/getFiles";
/**
 * Retrieves paginated file data based on the given parameters.
 * @param cursor the cursor object used for pagination, which contains the
 * discord id and created at of the file the cursor is currently pointing to
 * @param pageSize the number of files to be retrieved
 * @param searchQuery an optional search query
 * @returns the related file data
 */
export declare const getFileData: ({ cursor, pageSize, searchQuery }: GetFilesRequest) => Promise<{
    discordId: string;
    extension: string;
    fileName: string;
}[]>;
