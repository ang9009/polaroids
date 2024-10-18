import { AttachmentUploadData } from "../../../@types/data/attachmentUploadData.js";

// TODO: this should be stored in DB, and determined in setup stage
// TODO: this should also be a nested folder
const destinationFolderPath = "Test";

/**
 * Uploads a given array of files to PhotoStation.
 * @param files the array of files to be uploaded
 * @throws Error if the files argument is null, or if the file upload fails
 */
export const uploadFilesToPS = async (files: AttachmentUploadData[]) => {
  if (files == null) {
    throw Error("Files argument is null");
  }

  for (const file of files) {
    await file.upload(destinationFolderPath);
  }
};
