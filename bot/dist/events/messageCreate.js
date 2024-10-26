import { PhotoUploadData } from "../@types/data/photoUploadData.js";
import { SupportedPhotoType } from "../@types/data/supportedPhotoType.js";
import { uploadFilesToPS } from "../api/photostation/file/uploadFilesToPS.js";
import { getContentTypeFromMimeType } from "../api/photostation/utils/getContentTypeFromMimeType.js";
import { formatBytes } from "../utils/formatBytes.js";
import { getBlobFromUrl } from "../utils/getBlobFromUrl.js";
import { VideoUploadData } from "./../@types/data/videoUploadData";
module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        if (message.author.bot || message.attachments.size === 0) {
            return;
        }
        const initialMsgRef = await message.reply("Processing attachments...");
        const attachments = message.attachments.map((attachment) => attachment);
        let blobs, contentTypes, ids, unsupportedAttachmentsString;
        try {
            ({ unsupportedAttachmentsString, blobs, contentTypes, ids } =
                await processAndValidateAttachments(attachments));
        }
        catch (err) {
            console.error("Error occurred while processing attachments:", err);
            initialMsgRef.edit(`An error occurred while processing attachments: ${err}`);
            return;
        }
        // If there are unsupported attachments, handle them
        if (unsupportedAttachmentsString) {
            // If all attachments are unsupported, return immediately
            if (blobs.length === 0) {
                initialMsgRef.edit(`All of the provided files are of unsupported formats: ${unsupportedAttachmentsString}. Please try again.`);
                return;
            }
            else {
                message.reply(`File(s) of unsupported formats found: ${unsupportedAttachmentsString}. These will be ignored.`);
            }
        }
        const allFilesData = getAttachmentsUploadData(blobs, ids, contentTypes);
        const totalSizeString = getAttachmentsTotalSizeString(blobs);
        try {
            initialMsgRef.edit("Uploading attachments...");
            await uploadFilesToPS(allFilesData);
        }
        catch (err) {
            console.error("Error occurred while uploading attachments:", err);
            initialMsgRef.edit(`An error occurred while uploading attachments: ${err}`);
            return;
        }
        message.reply(`Attachments sent! Size of upload: ${totalSizeString}`);
    },
};
/**
 * Produces a formatted string representation of the total size of the given files.
 * @param blobs an array of blobs
 * @returns a formatted string representation of the files' total size (e.g. 12MB)
 */
const getAttachmentsTotalSizeString = (blobs) => {
    const totalSizeBytes = blobs.reduce((size, blob) => size + blob.size, 0);
    const totalSize = formatBytes(totalSizeBytes);
    return totalSize;
};
/**
 * Converts attachment data into a array of AttachmentUploadData objects. This
 * assumes that blobs[i], ids[i], and contentTypes[i] all correspond to the same file.
 * @param blobs the blobs corresponding to each attachment
 * @param ids the ids for each attachment
 * @param contentTypes the content types for each attachment
 * @returns a array of the corresponding AttachmentUploadData objects
 */
const getAttachmentsUploadData = (blobs, ids, contentTypes) => {
    return blobs.map((blob, i) => {
        const id = ids[i];
        const contentType = contentTypes[i];
        let data;
        if (contentType instanceof SupportedPhotoType) {
            data = new PhotoUploadData(blob, id, [], contentTypes[i]);
        }
        else {
            data = new VideoUploadData(blob, id, [], contentTypes[i]);
        }
        return data;
    });
};
/**
 * Processes an array of attachments, filtering out invalid attachments (of
 * unsupported types) and extracting data from valid ones
 * @param attachments - The array of attachments to process.
 * @returns An object containing:
 *      - unsupportedAttachmentsString: A string listing unsupported attachments.
 *      - blobs: An array of Blob objects for valid attachments.
 *      - ids: An array of IDs for valid attachments.
 *      - contentTypes: An array of content types for valid attachments.
 *      (Note: blobs[i], ids[i], and contentTypes[i] correspond to the same file.)
 * @throws an error if a file extension is not recognized, or if there isn't a
 *     SupportedContentType associated with the MIME type found (see getContentTypeFromString).
 */
const processAndValidateAttachments = async (attachments) => {
    const blobs = [];
    const ids = [];
    const unsupportedAttachments = [];
    const contentTypes = [];
    for (const attachment of attachments) {
        const attachmentName = attachment.name;
        const mimeType = attachment.contentType;
        if (!mimeType) {
            unsupportedAttachments.push(`${attachmentName} (unknown type)`);
            continue;
        }
        const contentType = getContentTypeFromMimeType(mimeType);
        // Content type is not recognized
        if (!contentType) {
            unsupportedAttachments.push(`${attachmentName} (${mimeType})`);
            continue;
        }
        contentTypes.push(contentType);
        ids.push(attachment.id);
        const file = await getBlobFromUrl(attachment.url);
        blobs.push(file);
    }
    const unsupportedAttachmentsString = unsupportedAttachments.join(", ");
    return { unsupportedAttachmentsString, blobs, ids, contentTypes };
};
//# sourceMappingURL=messageCreate.js.map