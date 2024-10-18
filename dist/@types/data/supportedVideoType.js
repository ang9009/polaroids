import { Extension } from "./extension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";
/**
 * Video types that Polaroids supports.
 */
export class SupportedVideoType extends SupportedContentType {
    static MP4 = new SupportedVideoType(Extension.MP4, MimeType.MP4);
    static MOV = new SupportedVideoType(Extension.MOV, MimeType.MOV);
    static MPEG = new SupportedVideoType(Extension.MPEG, MimeType.MPEG);
}
//# sourceMappingURL=supportedVideoType.js.map