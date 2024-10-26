import { AttachmentUploadData } from "./attachmentUploadData.js";
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
    constructor(blob, id, people, contentType) {
        super(blob, id, people, contentType);
    }
    /**
     * Uploads this photo to PhotoStation.
     * @param folderPath the folder the photo will be saved to
     */
    async upload(folderPath) {
        super.uploadFile(folderPath, AttachmentUploadData.UploadFileMethod.Photo);
    }
}
//# sourceMappingURL=photoUploadData.js.map