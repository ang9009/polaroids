import { AttachmentUploadData } from "../types/data/attachmentUploadData";

// TODO: this should be stored in DB, and determined in setup stage
// TODO: this should also be a nested folder
const destinationFolderPath = "Test/test 2";

/**
 * Uploads a given array of files to PhotoStation.
 * @param files the array of files to be uploaded
 * @throws Error if the files argument is null, or if any file uploads fail
 */
export const uploadFiles = async (files: AttachmentUploadData[]) => {
  if (files == null) {
    throw Error("Files argument is null");
  }

  // Unfortunately, if anything bad happens midway (e.g. some files are uploaded
  // and one throws an error), there is no "transaction" feature like in SQL
  // where I can rollback.
  for (const file of files) {
    await file.upload(destinationFolderPath);
  }
};
