import axios, { isAxiosError } from "axios";
import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import { ApiErrorResponseSchema } from "shared/src/responses/error/apiErrorResponse";
/**
 * Deletes an album, provided that it has no associated files.
 * @param albumName the album's original name
 */
export const deleteAlbum = async (albumName) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/albums/${albumName}`;
    try {
        await axios.delete(url);
    }
    catch (err) {
        if (isAxiosError(err)) {
            const parsedRes = ApiErrorResponseSchema.safeParse(err.response);
            if (!parsedRes.success) {
                return;
            }
            const { data: errResponse } = parsedRes;
            if (errResponse.errorType === DbApiErrorType.UNKNOWN_EXCEPTION) {
                throw Error("Albums that have associated files cannot be deleted.");
            }
        }
    }
};
//# sourceMappingURL=deleteAlbum.js.map