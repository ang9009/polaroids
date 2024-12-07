import axios, { isAxiosError } from "axios";
import "dotenv/config";
import { getValue } from "node-global-storage";
import { sessionIdKey } from "../data/constants";

/**
 * Uploads the given files to FileStation.
 * @param files the files to be uploaded
 */
export const uploadFilesToFS = async (files: Express.Multer.File[]) => {
  const { FS_API_URL, FS_SHARED_FOLDER } = process.env;
  const sessionId = getValue(sessionIdKey);
  const url = `${FS_API_URL}/entry.cgi?api=SYNO.FileStation.Upload`;

  try {
    for (const file of files) {
      const params = {
        version: 2,
        method: "upload",
        path: FS_SHARED_FOLDER,
        filename: file,
        _sid: sessionId,
      };
      console.log(url, params);

      await axios.post(url, {
        params,
      });
    }
  } catch (err) {
    if (isAxiosError(err)) {
      throw Error("An error occurred while trying to upload files to FileStation: " + err.message);
    }
  }
};
