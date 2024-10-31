/**
 * Represents the content types that polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with PhotoStation6
 * supported types.
 */
export class SupportedContentType {
  extension;
  mimeType;
  /**
   * The constructor for a SupportedContentType.
   * @param extension the content type's extension
   * @param mimeType the MIME type of the content type
   */
  constructor(extension, mimeType) {
    this.extension = extension;
    this.mimeType = mimeType;
  }
}
//# sourceMappingURL=supportedContentType.js.map
