import { isAxiosError } from "axios";
import { ApiErrorType } from "shared/src/error-codes/apiErrorType";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { ApiErrorResponseSchema } from "shared/src/responses/error/apiErrorResponse";
import { apiClient } from "../../../lib/axios";

/**
 * Deletes an album, provided that it has no associated files.
 * @param albumId the album's id
 */
export const deleteAlbum = async (albumId: string) => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/albums/${albumId}`;

  try {
    await apiClient.delete(url);
  } catch (err) {
    if (isAxiosError(err)) {
      const parsedRes = ApiErrorResponseSchema.safeParse(err.response?.data);
      if (!parsedRes.success) {
        return;
      }
      const { data: errResponse } = parsedRes;
      if (errResponse.errorType === ApiErrorType.UNKNOWN_EXCEPTION) {
        throw Error("Albums that have associated files cannot be deleted.");
      } else if (
        errResponse.errorType === ApiErrorType.DB_EXCEPTION &&
        errResponse.dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND
      ) {
        throw Error(`The specified album no longer exists.`);
      }
    }
    throw Error("An unknown error occurred. Please try again.");
  }
};
