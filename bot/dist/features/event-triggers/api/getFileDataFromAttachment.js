import { getExtensionFromMimetype } from "shared/src/helpers/getExtensionFromMimetype";
/**
 * Returns the blob and its name fetched from the given url.
 * @param attachment the attachment in question
 * @param createdAt when the file was uploaded
 * @param uploaderId the id of the user who uploaded this file
 * @returns the attachment as a FileData object
 */
export const getFileDataFromAttachment = async (attachment, createdAt, uploaderId) => {
    const { name, id, url } = attachment;
    const res = await fetch(url);
    const blob = await res.blob();
    return {
        extension: getExtensionFromMimetype(attachment.contentType),
        blob: blob,
        link: attachment.url,
        fileName: name,
        discordId: id,
        createdAt,
        uploaderId,
        description: null,
    };
};
//# sourceMappingURL=getFileDataFromAttachment.js.map