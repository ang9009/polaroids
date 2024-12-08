import axios from "axios";
import { FileData } from "../types/fileData";

/**
 * Uploads the given files to the API.
 * @param files the files to be uploaded
 * @param albumName the name of the album the file will be associated with
 */
export const uploadFiles = async (files: FileData[], albumName: string) => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/files`;
  const formData = new FormData();
  const discordIds = files.map((file) => file.discordId);

  formData.append("albumName", albumName);
  for (const file of files) {
    formData.append("files", file.blob, file.name);
  }
  for (const id of discordIds) {
    formData.append("ids[]", id);
  }

  await axios.post(url, formData);
};
