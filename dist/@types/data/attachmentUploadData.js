/**
 * Data for an photo/video to be uploaded.
 */
export class AttachmentUploadData {
    file;
    id;
    people;
    contentType;
    /**
     * Constructor for an AttachmentUploadData object.
     * @param file the file to be uploaded. This file's name should be the
     *             Attachment object's id and its file extension
     * @param id the id of the attachment
     * @param people the people in the photo
     * @param contentType the type of the content
     */
    constructor(file, id, people, contentType) {
        this.file = file;
        this.id = id;
        this.people = people;
        this.contentType = contentType;
    }
}
//# sourceMappingURL=attachmentUploadData.js.map