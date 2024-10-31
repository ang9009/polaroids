import { Extension } from "./extension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";

/**
 * Photo types that polaroids supports.
 */
export class SupportedPhotoType extends SupportedContentType {
  public static readonly JPG = new SupportedPhotoType(Extension.JPG, MimeType.JPG);
  public static readonly PNG = new SupportedPhotoType(Extension.PNG, MimeType.PNG);
  public static readonly TIFF = new SupportedPhotoType(Extension.TIFF, MimeType.TIFF);
  public static readonly GIF = new SupportedPhotoType(Extension.GIF, MimeType.GIF);
}
