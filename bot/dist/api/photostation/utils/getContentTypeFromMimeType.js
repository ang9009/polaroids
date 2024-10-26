import { MimeType } from "../../../@types/data/mimeType";
import { SupportedPhotoType } from "../../../@types/data/supportedPhotoType";
import { SupportedVideoType } from "../../../@types/data/supportedVideoType";
/**
 * Factory method that returns the associated SupportedContentType enum given a file extension,
 * or undefined if it is not supported.
 * @param mimeType the file extension in question
 * @returns the associated SupportContentType enum, or undefined if not supported
 */
export const getContentTypeFromMimeType = (mimeType) => {
    let supportedContentType;
    switch (mimeType) {
        // case MimeType.GIF:
        //   supportedContentType = SupportedPhotoType.GIF;
        //   break;
        case MimeType.JPG:
            supportedContentType = SupportedPhotoType.JPG;
            break;
        case MimeType.PNG:
            supportedContentType = SupportedPhotoType.PNG;
            break;
        case MimeType.TIFF:
            supportedContentType = SupportedPhotoType.TIFF;
            break;
        case MimeType.MOV:
            supportedContentType = SupportedVideoType.MOV;
            break;
        case MimeType.MP4:
            supportedContentType = SupportedVideoType.MP4;
            break;
        case MimeType.MPEG:
            supportedContentType = SupportedVideoType.MPEG;
            break;
        default:
            supportedContentType = undefined;
    }
    return supportedContentType;
};
//# sourceMappingURL=getContentTypeFromMimeType.js.map