import { AttachmentUploadData } from "./attachmentUploadData.js";
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
    constructor(file, id, people, contentType) {
        super(file, id, people, contentType);
    }
    /**
     * Uploads the video to PhotoStation.
     * @param folderPath the folder the video will be saved to
     */
    upload(folderPath) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=videoUploadData.js.map