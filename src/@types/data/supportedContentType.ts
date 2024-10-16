import Extension from "./Extension";
import MimeType from "./mimeType";

/**
 * Represents the content types that Polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with PhotoStation6
 * supported types.
 */
export abstract class SupportedContentType {
  public readonly extension: Extension;
  public readonly mimeType: MimeType;

  /**
   * The constructor for a SupportedContentType.
   * @param extension the content type's extension
   * @param mimeType the MIME type of the content type
   */
  protected constructor(extension: Extension, mimeType: MimeType) {
    this.extension = extension;
    this.mimeType = mimeType;
  }
}

/**
 * Photo types that Polaroids supports.
 */
export class SupportedPhotoType extends SupportedContentType {
  public static readonly JPG = new SupportedPhotoType(Extension.JPG, MimeType.JPG);
  public static readonly PNG = new SupportedPhotoType(Extension.PNG, MimeType.PNG);
  public static readonly GIF = new SupportedPhotoType(Extension.GIF, MimeType.GIF);
  public static readonly TIFF = new SupportedPhotoType(Extension.TIFF, MimeType.TIFF);
}

/**
 * Video types that Polaroids supports.
 */
export class SupportedVideoType extends SupportedContentType {
  public static readonly MP4 = new SupportedVideoType(Extension.MP4, MimeType.MP4);
  public static readonly MOV = new SupportedVideoType(Extension.MOV, MimeType.MOV);
  public static readonly MPEG = new SupportedVideoType(Extension.MPEG, MimeType.MPEG);
}
