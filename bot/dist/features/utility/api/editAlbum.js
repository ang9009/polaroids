import axios, { isAxiosError } from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
/**
 * Updates an album's name and/or description.
 * @param albumId the album's id
 * @param newAlbumName the album's new name
 * @param newAlbumDesc the album's new description
 */
export const editAlbum = async (albumId, newAlbumName, newAlbumDesc) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/albums`;
    const data = {
        albumId,
        newAlbumName,
        newAlbumDesc: newAlbumDesc || undefined,
    };
    try {
        await axios.patch(url, data);
    }
    catch (err) {
        if (isAxiosError(err)) {
            const errorRes = err.response?.data;
            if (isDbExceptionResponse(errorRes)) {
                if (errorRes.dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw Error(`An album with the name ${newAlbumName} already exists! Please try again.`);
                }
                else if (errorRes.dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND) {
                    throw Error(`The specified album no longer exists. Please try again.`);
                }
            }
        }
        throw err;
    }
};
//# sourceMappingURL=editAlbum.js.map