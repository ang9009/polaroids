import { GetFilesCursor } from "shared/src/requests/files/cursor";
/**
 * Retrieves paginated file data based on the given parameters.
 * @param pageSize the number of files to be retrieved
 * @param cursor the cursor object used for pagination, which contains the
 * discord id and created at of the file the cursor is currently pointing to
 * @param searchQuery an optional search query
 * @param albumId the id of the album the files should be in
 * @returns the related file data
 */
export declare const getFileData: (pageSize: number, cursor?: GetFilesCursor, searchQuery?: string, albumId?: string) => Promise<{
    createdAt: Date;
    discordId: string;
    extension: string;
    fileName: string;
}[]>;
