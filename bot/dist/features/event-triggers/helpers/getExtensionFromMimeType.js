const mimeToExtension = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/bmp": "bmp",
    "image/tiff": "tiff",
    "application/pdf": "pdf",
    "application/json": "json",
    "text/plain": "txt",
    "text/html": "html",
    "text/css": "css",
    "text/javascript": "js",
    "application/javascript": "js",
    "application/xml": "xml",
    "audio/mpeg": "mp3",
    "audio/ogg": "ogg",
    "audio/wav": "wav",
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/x-msvideo": "avi",
    "application/zip": "zip",
    "application/x-tar": "tar",
};
/**
 * Returns the associated extension of the given MIME type.
 * @param mimeType the MIME type in question
 * @returns the corresponding extension
 */
export const getExtensionFromMimeType = (mimeType) => {
    if (mimeToExtension[mimeType]) {
        return mimeToExtension[mimeType];
    }
    throw Error("Unrecognized MIME type " + mimeType);
};
//# sourceMappingURL=getExtensionFromMimeType.js.map