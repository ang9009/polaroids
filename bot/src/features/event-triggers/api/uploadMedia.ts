import axios from "axios";
import { NamedBlob } from "../types/namedBlob";

/**
 * Uploads the given files to the API.
 * @param files the media to be uploaded
 * @param albumName the name of the album the media will be associated with
 */
export const uploadMedia = async (files: NamedBlob[], albumName: string) => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/media`;
  const formData = new FormData();

  formData.append("albumName", albumName);
  for (const file of files) {
    formData.append("files", file.blob, file.name);
  }

  await axios.post(url, formData);
};
