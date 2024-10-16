import Extension from "./Extension";
import MimeType from "./mimeType";

/**
 * Represents the content types that Polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with PhotoStation6
 * supported types.
 */
abstract class SupportedContentType {
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

export default SupportedContentType;
