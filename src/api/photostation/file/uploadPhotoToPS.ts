import axios from "axios";
import { PSApiRoutes } from "../../../@types/api/PSApiRoutes";
import { AttachmentUploadData } from "../../../@types/data/attachmentUploadData";
import SupportedPhotoType from "../../../@types/data/supportedPhotoType";
import getPSApiUrlForRoute from "../utils/getPSApiUrlForRoute";

/**
 * Uploads a given photo to PhotoStation.
 * @param file
 */
export const uploadPhotoToPS = (file: AttachmentUploadData) => {
  if (!(file.contentType instanceof SupportedPhotoType)) {
    throw new Error("Invalid content type passed as argument: must be a photo type");
  }
  const url = getPSApiUrlForRoute(PSApiRoutes.Auth);

  axios.post(url);
};
