import { getFileDataFromAttachment } from "../../event-triggers/api/getFileDataFromAttachment";
/**
 * Retrieves file data for a given list of attachments.
 * @param attachments the attachments in question
 * @param sentAt when the attachments were sent
 * @param uploader the uploader
 * @returns the attachments' file data
 */
export const getFileDataFromAttachments = async (attachments, sentAt, uploader) => {
    const attachmentFilePromises = attachments.map((attachment) => {
        return getFileDataFromAttachment(attachment, sentAt, uploader.id);
    });
    const attachmentFiles = await Promise.all(attachmentFilePromises);
    return attachmentFiles;
};
//# sourceMappingURL=getFileDataFromAttachments.js.map