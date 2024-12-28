import axios from "axios";
import { FilesUploadData } from "shared/src/requests/files/uploadFiles";
import { UploadFilesResponseSchema } from "shared/src/responses/files/getFiles";
import { FileData } from "../types/fileData";

/**
 * Uploads the given files to the API.
 * @param files the files to be uploaded
 * @param albumId the id of the album the file will be associated with
 * @param throwUniqueConstraintError whether an error should be thrown if there
 *                                   is a unique constraint error
 * @returns the number of files successfully uploaded
 */
export const uploadFiles = async (
  files: FileData[],
  albumId: string,
  throwUniqueConstraintError: boolean,
): Promise<number> => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/files`;
  const formData = new FormData();

  formData.append("albumId", albumId);
  const filesData: FilesUploadData = {};
  for (const file of files) {
    const fileData = {
      fileName: file.fileName,
      uploaderId: file.uploaderId,
      createdAt: file.createdAt,
    };
    filesData[file.discordId] = fileData;
    formData.append("files", file.blob, file.discordId);
  }
  formData.append("filesData", JSON.stringify(filesData));
  formData.append("throwUniqueConstraintError", throwUniqueConstraintError);

  const res = await axios.post(url, formData);
  const parsedRes = UploadFilesResponseSchema.parse(res.data);
  return parsedRes.filesUploaded;
};
