export var AllowedMimeType;
(function (AllowedMimeType) {
    AllowedMimeType["JPEG"] = "image/jpeg";
    AllowedMimeType["PNG"] = "image/png";
    AllowedMimeType["GIF"] = "image/gif";
    AllowedMimeType["WEBP"] = "image/webp";
    AllowedMimeType["BMP"] = "image/bmp";
    AllowedMimeType["TIFF"] = "image/tiff";
    AllowedMimeType["MP4"] = "video/mp4";
    AllowedMimeType["WEBM"] = "video/webm";
    AllowedMimeType["MOV"] = "video/quicktime";
})(AllowedMimeType || (AllowedMimeType = {}));
/**
 * Returns whether the given string is an allowed MIME type.
 * @param mimetype the string in question
 * @returns whether it is an allowed MIME type
 */
export const isAllowedMimeType = (mimetype) => {
    const types = Object.values(AllowedMimeType);
    return !!types.includes(mimetype);
};
//# sourceMappingURL=allowedMimeType.js.map