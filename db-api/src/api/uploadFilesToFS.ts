import axios, { isAxiosError } from "axios";
import "dotenv/config";
import { getValue } from "node-global-storage";
import { sessionIdKey, synoTokenKey } from "../data/constants";

/**
 * Uploads the given files to FileStation.
 * @param files the files to be uploaded
 */
export const uploadFilesToFS = async (files: Express.Multer.File[]) => {
  try {
    for (const file of files) {
      await uploadFile(file);
    }
  } catch (err) {
    if (isAxiosError(err)) {
      throw Error("An error occurred while trying to upload files to FileStation: " + err.code);
    }
  }
};

/**
 * Uploads a singular file to FileStation.
 * @param file the file to be uploaded
 */
async function uploadFile(file: Express.Multer.File) {
  const { FS_API_URL, FS_FOLDER_PATH } = process.env;
  const sessionId: string = getValue(sessionIdKey);
  const synoToken: string = getValue(synoTokenKey);

  // Set up url and headers
  const url = `${FS_API_URL}/webman/modules/FileBrowser/webfm/webUI/html5_upload.cgi`;
  const headers = {
    Cookie: `stay-login=1; id=${sessionId}`,
    "X-SYNO-TOKEN": synoToken,
  };

  // Set up form data
  const form = new FormData();
  const blob = new Blob([file.buffer], { type: file.mimetype });
  form.append("overwrite", "false");
  form.append("path", FS_FOLDER_PATH!);
  form.append("file", blob, file.originalname);

  await axios.post(url, form, { headers: headers });
}
