import { Extension } from "./extension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";
/**
 * Photo types that polaroids supports.
 */
export class SupportedPhotoType extends SupportedContentType {
  static JPG = new SupportedPhotoType(Extension.JPG, MimeType.JPG);
  static PNG = new SupportedPhotoType(Extension.PNG, MimeType.PNG);
  static TIFF = new SupportedPhotoType(Extension.TIFF, MimeType.TIFF);
}
//# sourceMappingURL=supportedPhotoType.js.map
