import { AttachmentUploadData } from "../../../@types/data/attachmentUploadData.js";

const destinationFolderPath = "Alvin and HS Friends";

/**
 * Uploads a given array of files to PhotoStation.
 * @param files the array of files to be uploaded
 * @throws Error if the files argument is null
 */
const uploadFilesToPS = async (files: AttachmentUploadData[]) => {
  if (files == null) {
    throw Error("Files argument is null");
  }

  for (const file of files) {
  }
};

export default uploadFilesToPS;
