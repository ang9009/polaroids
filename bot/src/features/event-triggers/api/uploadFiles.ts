import axios from "axios";
import { FilesUploadData } from "shared/src/requests/file-requests/UploadFilesReqBody";
import { GetFilesResponseSchema } from "shared/src/responses/file-responses/getFilesResponse";
import { FileData } from "../types/fileData";

/**
 * Uploads the given files to the API.
 * @param files the files to be uploaded
 * @param albumName the name of the album the file will be associated with
 * @param throwUniqueConstraintError whether an error should be thrown if there
 *                                   is a unique constraint error
 * @returns the number of files successfully uploaded
 */
export const uploadFiles = async (
  files: FileData[],
  albumName: string,
  throwUniqueConstraintError: boolean,
): Promise<number> => {
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
    filesData[file.attachmentId] = fileData;
    formData.append("files", file.blob, file.attachmentId);
  }
  formData.append("filesData", JSON.stringify(filesData));
  formData.append("throwUniqueConstraintError", throwUniqueConstraintError);

  const res = await axios.post(url, formData);
  const parsedRes = GetFilesResponseSchema.parse(res.data);
  return parsedRes.filesUploaded;
};
