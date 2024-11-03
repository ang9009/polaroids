import axios from "axios";
import { getValidatedPSData } from "../../api/photostation/session/getValidatedPSData.js";
import { getPSApiUrlForRoute } from "../../api/photostation/utils/getPSApiUrlForRoute.js";
import { PSApiRoutes } from "../api/PSApiRoutes.js";
var UploadFileMethod;
(function (UploadFileMethod) {
  UploadFileMethod["Photo"] = "uploadphoto";
  UploadFileMethod["Video"] = "uploadvideo";
})(UploadFileMethod || (UploadFileMethod = {}));
/**
 * Data for an photo/video to be uploaded.
 */
export class AttachmentUploadData {
  blob;
  id;
  people;
  contentType;
  static UploadFileMethod = UploadFileMethod;
  /**
   * Constructor for an AttachmentUploadData object.
   * @param blob the file to be uploaded. This file's name should be the
   *             Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  constructor(blob, id, people, contentType) {
    this.blob = blob;
    this.id = id;
    this.people = people;
    this.contentType = contentType;
  }
  /**
   * Uploads a file, given its folderPath and upload method.
   * @param folderPath the folder path the file will be saved to
   * @param uploadFileMethod the method of uploading (uploadimage or uploadvideo)
   */
  async uploadFile(folderPath, uploadFileMethod) {
    const sessionId = global.localStorage.getItem("sessionId");
    if (!sessionId) {
      throw new Error("Failed to upload photo: session ID is null");
    }
    const headers = {
      Cookie: `PHPSESSID=${sessionId}`,
    };
    // The filename should be the unique id + the extension. The id is used
    // because the backup feature (TBD) should not back up previously uploaded images
    const params = {
      method: uploadFileMethod,
      version: "1",
      dest_folder_path: folderPath,
      mtime: Date.now(),
      filename: this.id + this.contentType.extension,
      duplicate: "overwrite",
    };
    const url = getPSApiUrlForRoute(PSApiRoutes.File);
    // The FileStation API requires data to be sent as forms
    const photoFormData = new FormData();
    photoFormData.append("original", this.blob);
    try {
      const res = await axios.post(url, photoFormData, { withCredentials: true, headers, params });
      const data = getValidatedPSData(res);
      if (!data.success && data.error) {
        throw new Error(`Error code ${data.error.code}`);
      }
    } catch (error) {
      throw new Error(`An error occurred while trying to upload a photo to PhotoStation: ${error}`);
    }
  }
}
//# sourceMappingURL=attachmentUploadData.js.map
