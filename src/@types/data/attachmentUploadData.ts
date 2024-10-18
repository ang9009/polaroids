import axios from "axios";
import { getValidatedPSData } from "../../api/photostation/session/getValidatedPSData.js";
import { getPSApiUrlForRoute } from "../../api/photostation/utils/getPSApiUrlForRoute.js";
import { PSApiRoutes } from "../api/PSApiRoutes.js";
import { People } from "./people.js";
import { SupportedContentType } from "./supportedContentType.js";
import { SupportedPhotoType } from "./supportedPhotoType.js";
import { SupportedVideoType } from "./supportedVideoType.js";

/**
 * Data for an photo/video to be uploaded.
 */
export abstract class AttachmentUploadData {
  public readonly file: File;
  public readonly id: string;
  public readonly people: People[];
  public readonly contentType: SupportedContentType;

  /**
   * Constructor for an AttachmentUploadData object.
   * @param file the file to be uploaded. This file's name should be the
   * Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  protected constructor(
    file: File,
    id: string,
    people: People[],
    contentType: SupportedContentType,
  ) {
    this.file = file;
    this.id = id;
    this.people = people;
    this.contentType = contentType;
  }

  /**
   * Uploads the file to PhotoStation.
   * @param folderPath the folder the file will be saved to
   */
  public abstract upload(folderPath: string): void;
}

/**
 * Data for a photo to be uploaded.
 */
export class PhotoUploadData extends AttachmentUploadData {
  /**
   * Constructor for a PhotoUploadData object.
   * @param file the file to be uploaded. This file's name should be the
   * Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  public constructor(file: File, id: string, people: People[], contentType: SupportedPhotoType) {
    super(file, id, people, contentType);
  }

  /**
   * Uploads the photo to PhotoStation.
   * @param folderPath the folder the photo will be saved to
   */
  public upload = async (folderPath: string) => {
    const sessionId = global.localStorage.getItem("sessionId");
    if (!sessionId) {
      throw new Error("Failed to upload photo: session ID is null");
    }

    const headers = {
      Cookie: `PHPSESSID=${sessionId}`,
      "Content-Type": this.contentType.mimeType,
    };
    const params = {
      method: "uploadphoto",
      version: "1",
      dest_folder_path: folderPath,
      mtime: Date.now(),
      filename: this.file.name,
      duplicate: "overwrite",
    };
    const url = getPSApiUrlForRoute(PSApiRoutes.File);
    try {
      const res = await axios.post(
        url,
        { original: this.file },
        { withCredentials: true, headers, params },
      );

      const data = getValidatedPSData(res);
      console.log(res);
    } catch (error) {
      throw new Error(`An error occurred while trying to upload a photo to PhotoStation: ${error}`);
    }
  };
}

/**
 * Data for a video to be uploaded.
 */
export class VideoUploadData extends AttachmentUploadData {
  /**
   * Constructor for a VideoUploadData object.
   * @param file the file to be uploaded. This file's name should be the
   * Attachment object's id and its file extension
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  public constructor(file: File, id: string, people: People[], contentType: SupportedVideoType) {
    super(file, id, people, contentType);
  }

  /**
   * Uploads the video to PhotoStation.
   * @param folderPath the folder the video will be saved to
   */
  public upload(folderPath: string): void {
    throw new Error("Method not implemented.");
  }
}
