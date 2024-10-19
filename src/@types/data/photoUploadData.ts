import { AxiosProgressEvent } from "axios";
import { AttachmentUploadData } from "./attachmentUploadData.js";
import { People } from "./people.js";
import { SupportedPhotoType } from "./supportedPhotoType.js";

/**
 * Data for a photo to be uploaded.
 */
export class PhotoUploadData extends AttachmentUploadData {
  /**
   * Constructor for a PhotoUploadData object.
   * @param blob the blob to be uploaded
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  public constructor(blob: Blob, id: string, people: People[], contentType: SupportedPhotoType) {
    super(blob, id, people, contentType);
  }

  /**
   * Uploads this photo to PhotoStation.
   * @param folderPath the folder the photo will be saved to
   * @param updateLoadingBar a function that updates the loading bar, given the
   *        AxiosProgressEvent object
   */
  public async upload(
    folderPath: string,
    updateLoadingBar: (res: AxiosProgressEvent) => void,
  ): Promise<void> {
    super.uploadFile(folderPath, AttachmentUploadData.UploadFileMethod.Photo, updateLoadingBar);
  }
}
