export var MimeType;
(function (MimeType) {
    MimeType["JPG"] = "image/jpeg";
    MimeType["TIFF"] = "image/tiff";
    MimeType["PNG"] = "image/png";
    MimeType["GIF"] = "image/gif";
    MimeType["MP4"] = "video/mp4";
    MimeType["MPEG"] = "video/mpeg";
    MimeType["MOV"] = "video/mov";
})(MimeType || (MimeType = {}));
var FileType;
(function (FileType) {
    FileType[FileType["PHOTO"] = 0] = "PHOTO";
    FileType[FileType["VIDEO"] = 1] = "VIDEO";
})(FileType || (FileType = {}));
var Extension;
(function (Extension) {
    Extension["JPG"] = ".jpg";
    Extension["TIFF"] = ".tiff";
    Extension["PNG"] = ".png";
    Extension["GIF"] = ".gif";
    Extension["MP4"] = ".mp4";
    Extension["MPEG"] = ".mpeg";
    Extension["MOV"] = ".mov";
})(Extension || (Extension = {}));
/**
 * Represents the content types that Polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with PhotoStation6
 * supported types.
 */
export class SupportedContentType {
    mimeType;
    fileType;
    extension;
    static contentTypeMap = new Map();
    static JPG = new SupportedContentType(MimeType.JPG, FileType.PHOTO, Extension.JPG);
    static TIFF = new SupportedContentType(MimeType.TIFF, FileType.PHOTO, Extension.TIFF);
    static PNG = new SupportedContentType(MimeType.PNG, FileType.PHOTO, Extension.PNG);
    static GIF = new SupportedContentType(MimeType.GIF, FileType.PHOTO, Extension.GIF);
    static MP4 = new SupportedContentType(MimeType.MP4, FileType.VIDEO, Extension.MP4);
    static MPEG = new SupportedContentType(MimeType.MPEG, FileType.VIDEO, Extension.MPEG);
    static MOV = new SupportedContentType(MimeType.MOV, FileType.VIDEO, Extension.MOV);
    /**
     * Constructor for a SupportedContentType.
     * @param mimeType the MIME type for the content type
     * @param fileType the file type (photo or video)
     * @param extension the extension of the file type
     */
    constructor(mimeType, fileType, extension) {
        this.mimeType = mimeType;
        this.fileType = fileType;
        this.extension = extension;
        if (mimeType == null || fileType == null || extension == null) {
            throw new Error("Invalid mimetype, filetype, or extension provided");
        }
        // Automatically register each instance
        SupportedContentType.contentTypeMap.set(mimeType, this);
    }
    /**
     * Gets the supported content type according to the MIME type.
     * @param mimeType the MIME type
     * @returns the associated SupportedContentType
     */
    static getSupportedContentType(mimeType) {
        if (!mimeType) {
            throw Error("Invalid mimeType provided");
        }
        return this.contentTypeMap.get(mimeType);
    }
}
//# sourceMappingURL=supportedContentType.js.map