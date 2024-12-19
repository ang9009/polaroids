import axios, { isAxiosError } from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { CreateAlbumRequestBody } from "shared/src/requests/albums/createAlbum";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";

/**
 * Creates an album with the given name and description.
 * @param albumName the name of the album
 * @param albumDesc the album's description
 */
export const createAlbum = async (albumName: string, albumDesc: string | null) => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/albums`;

  const body: CreateAlbumRequestBody = { albumName, albumDesc: albumDesc || undefined };

  try {
    await axios.post(url, body).then(() => {
      console.log("Request complete");
    });
  } catch (err) {
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
};
