import { UploadFilesResponseSchema } from "shared/src/responses/files/uploadFiles";
import { apiClient } from "../../../lib/axios";
/**
 * Uploads the given files to the API.
 * @param files the files to be uploaded
 * @param albumId the id of the album the file will be associated with
 * @param throwUniqueConstraintError whether an error should be thrown if there
 *                                   is a unique constraint error
 * @returns the number of files successfully uploaded
 */
export const uploadFiles = async (files, albumId, throwUniqueConstraintError) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/files`;
    const formData = new FormData();
    formData.append("albumId", albumId);
    const filesData = {};
    for (const file of files) {
        const { fileName, uploaderId, createdAt, extension: fileExtension, link: fileLink } = file;
        const fileData = {
            fileName,
            uploaderId,
            createdAt,
            fileExtension,
            fileLink,
        };
        filesData[file.discordId] = fileData;
        formData.append("files", file.blob, file.discordId);
    }
    formData.append("filesData", JSON.stringify(filesData));
    formData.append("throwUniqueConstraintError", throwUniqueConstraintError);
    const res = await apiClient.post(url, formData);
    const parsedRes = UploadFilesResponseSchema.parse(res.data);
    return parsedRes.filesUploaded;
};
//# sourceMappingURL=uploadFiles.js.map