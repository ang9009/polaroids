import { AttachmentUploadData } from "./attachmentUploadData.js";
import { People } from "./people.js";
import { SupportedVideoType } from "./supportedVideoType.js";

/**
 * Data for a video to be uploaded.
 */
export class VideoUploadData extends AttachmentUploadData {
  /**
   * Constructor for a VideoUploadData object.
   * @param blob the blob to be uploaded
   * @param id the id of the attachment
   * @param people the people in the photo
   * @param contentType the type of the content
   */
  public constructor(blob: Blob, id: string, people: People[], contentType: SupportedVideoType) {
    super(blob, id, people, contentType);
  }

  /**
   * Uploads the video to PhotoStation.
   * @param folderPath the folder the video will be saved to
   * @throws an Error if session ID is null
   */
  public async upload(folderPath: string): Promise<void> {
    super.uploadFile(folderPath, AttachmentUploadData.UploadFileMethod.VIDEO);
  }
}
