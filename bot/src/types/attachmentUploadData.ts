import { PSApiRoutes } from "../../../db-api/src/types/api/PSApiRoutes.js";
import { People } from "./people.js";
import { SupportedContentType } from "./supportedContentType.js";
enum UploadFileMethod {
  Photo = "uploadphoto",
  Video = "uploadvideo",
}

/**
 * Data for an photo/video to be uploaded.
 */
export abstract class AttachmentUploadData {
  public readonly blob: Blob;
  public readonly id: string;
  public readonly people: People[];
  public readonly contentType: SupportedContentType;

  protected static readonly UploadFileMethod = UploadFileMethod;

  /**
   * Constructor for an AttachmentUploadData object.
   * @param blob the file to be uploaded. This file's name should be the
   *             Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  protected constructor(
    blob: Blob,
    id: string,
    people: People[],
    contentType: SupportedContentType,
  ) {
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
  protected async uploadFile(
    folderPath: string,
    uploadFileMethod: UploadFileMethod,
  ): Promise<void> {
    const sessionId = global.localStorage.getItem("sessionId");
    if (!sessionId) {
      throw new Error("Failed to upload photo: session ID is null");
    }

    const headers = {
      Cookie: `PHPSESSID=${sessionId}`,
    };
    // The filename should be the unique id + the extension. The attachment id is used
    // because the backup feature should not back up previously uploaded images
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
      const res = await axios.post(url, photoFormData, {
        withCredentials: true,
        headers,
        params,
      });
      const data = getValidatedPSData(res);
      if (!data.success && data.error) {
        throw new Error(`Error code ${data.error.code}`);
      }
    } catch (error) {
      throw new Error(`An error occurred while trying to upload a photo to PhotoStation: ${error}`);
    }
  }

  /**
   * Uploads the file to PhotoStation.
   * @param folderPath the folder the file will be saved to
   */
  public abstract upload(folderPath: string): Promise<void>;
}
