import { AttachmentUploadData } from "./attachmentUploadData.js";
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
    constructor(blob, id, people, contentType) {
        super(blob, id, people, contentType);
    }
    /**
     * Uploads the video to PhotoStation.
     * @param folderPath the folder the video will be saved to
     * @throws an Error if session ID is null
     */
    async upload(folderPath) {
        super.uploadFile(folderPath, AttachmentUploadData.UploadFileMethod.Video);
    }
}
//# sourceMappingURL=videoUploadData.js.map