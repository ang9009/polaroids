import { isAxiosError } from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { CreateAlbumResponseSchema } from "shared/src/responses/albums/createAlbum";
import { apiClient } from "../../../lib/axios";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
/**
 * Creates an album with the given name and description. This assumes that the
 * album does not already exist.
 * @param albumName the name of the album
 * @param albumDesc the album's description
 */
export const createAlbum = async (albumName, albumDesc) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/albums`;
    const body = { albumName, albumDesc: albumDesc || undefined };
    let res;
    try {
        res = await apiClient.post(url, body);
    }
    catch (err) {
        if (isAxiosError(err)) {
            const errorRes = err.response?.data;
            if (isDbExceptionResponse(errorRes)) {
                if (errorRes.dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw Error(`An album with the name ${albumName} already exists!`);
                }
            }
        }
        throw err;
    }
    const parseRes = CreateAlbumResponseSchema.safeParse(res.data);
    if (!parseRes.success) {
        throw Error("An unexpected error occurred. Please try again.");
    }
    return parseRes.data;
};
//# sourceMappingURL=createAlbum.js.map