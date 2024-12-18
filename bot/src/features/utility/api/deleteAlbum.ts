import axios from "axios";
import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import { callIfAxiosErrHasErrResponse } from "../../../utils/callIfAxiosErrHasErrResponse";

/**
 * Deletes an album, provided that it has no associated files.
 * @param albumName the album's original name
 */
export const deleteAlbum = async (albumName: string) => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/albums/${albumName}`;

  try {
    await axios.delete(url);
  } catch (err) {
    callIfAxiosErrHasErrResponse(err, (errResponse) => {
      if (errResponse.error === DbApiErrorType.UNKNOWN_EXCEPTION) {
        throw Error("Albums that have associated files cannot be deleted.");
      }
    });
  }
};
