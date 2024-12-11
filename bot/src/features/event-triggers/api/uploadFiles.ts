import axios from "axios";
import { FilesUploadData } from "shared/src/file-requests/UploadFilesReqBody";
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

  formData.append("albumName", albumName);
  const filesData: FilesUploadData = {};
  for (const file of files) {
    const fileData = {
      fileName: file.name,
      createdAt: file.createdAt,
    };
    filesData[file.discordId] = fileData;
    formData.append("files", file.blob, file.discordId);
  }
  formData.append("filesData", JSON.stringify(filesData));

  await axios.post(url, formData);
};
