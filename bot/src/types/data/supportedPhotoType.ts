import { FileExtension } from "./fileExtension";
import { MimeType } from "./mimeType";
import { SupportedContentType } from "./supportedContentType";

/**
 * Photo types that polaroids supports.
 */
export class SupportedPhotoType extends SupportedContentType {
  public static readonly JPG = new SupportedPhotoType(FileExtension.JPG, MimeType.JPG);
  public static readonly PNG = new SupportedPhotoType(FileExtension.PNG, MimeType.PNG);
  public static readonly TIFF = new SupportedPhotoType(FileExtension.TIFF, MimeType.TIFF);
  public static readonly GIF = new SupportedPhotoType(FileExtension.GIF, MimeType.GIF);
}
