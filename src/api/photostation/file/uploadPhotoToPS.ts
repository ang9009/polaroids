import { PSApiRoutes } from "../../../@types/api/PSApiRoutes";
import { AttachmentUploadData } from "../../../@types/data/attachmentUploadData";
import { SupportedPhotoType } from "../../../@types/data/supportedPhotoType";
import { getPSApiUrlForRoute } from "../utils/getPSApiUrlForRoute";

/**
 * Uploads a given photo to PhotoStation.
 * @param photo
 */
export const uploadPhotoToPS = (photo: AttachmentUploadData) => {
  if (!(photo.contentType instanceof SupportedPhotoType)) {
    throw new Error("Invalid content type passed as argument: must be a photo type");
  }

  const headers = {
    Cookie: global.localStorage.getItem("sessionId"),
  };
  const url = getPSApiUrlForRoute(PSApiRoutes.Auth);
  // await axios.post(url, { data: photo.file }, headers, withCredentials: true);
};
