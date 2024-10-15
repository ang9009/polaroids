export enum MimeType {
  JPG = "image/jpeg",
  TIFF = "image/tiff",
  PNG = "image/png",
  GIF = "image/gif",
  MP4 = "video/mp4",
  MPEG = "video/mpeg",
  MOV = "video/mov",
}

enum FileType {
  PHOTO,
  VIDEO,
}

enum Extension {
  JPG = ".jpg",
  TIFF = ".tiff",
  PNG = ".png",
  GIF = ".gif",
  MP4 = ".mp4",
  MPEG = ".mpeg",
  MOV = ".mov",
}

/**
 * Represents the content types that Polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with PhotoStation6
 * supported types.
 */
export class SupportedContentType {
  private static readonly contentTypeMap: Map<MimeType, SupportedContentType> = new Map();

  static readonly JPG = new SupportedContentType(MimeType.JPG, FileType.PHOTO, Extension.JPG);
  static readonly TIFF = new SupportedContentType(MimeType.TIFF, FileType.PHOTO, Extension.TIFF);
  static readonly PNG = new SupportedContentType(MimeType.PNG, FileType.PHOTO, Extension.PNG);
  static readonly GIF = new SupportedContentType(MimeType.GIF, FileType.PHOTO, Extension.GIF);
  static readonly MP4 = new SupportedContentType(MimeType.MP4, FileType.VIDEO, Extension.MP4);
  static readonly MPEG = new SupportedContentType(MimeType.MPEG, FileType.VIDEO, Extension.MPEG);
  static readonly MOV = new SupportedContentType(MimeType.MOV, FileType.VIDEO, Extension.MOV);

  /**
   * Constructor for a SupportedContentType.
   * @param mimeType the MIME type for the content type
   * @param fileType the file type (photo or video)
   * @param extension the extension of the file type
   */
  private constructor(
    public readonly mimeType: MimeType,
    public readonly fileType: FileType,
    public readonly extension: Extension,
  ) {
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
  public static getSupportedContentType(mimeType: MimeType): SupportedContentType | undefined {
    if (!mimeType) {
      throw Error("Invalid mimeType provided");
    }
    return this.contentTypeMap.get(mimeType);
  }
}
