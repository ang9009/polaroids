/**
 * All of the content types that polaroids recognizes. For further extension,
 * look up common MIME types, and cross reference them with FileStation
 * supported types.
 */
export var SupportedContentType;
(function (SupportedContentType) {
  SupportedContentType["JPG"] = "image/jpeg";
  SupportedContentType["TIFF"] = "image/tiff";
  SupportedContentType["PNG"] = "image/png";
  SupportedContentType["GIF"] = "image/gif";
  SupportedContentType["MP4"] = "video/mp4";
  SupportedContentType["MPEG"] = "video/mpeg";
  SupportedContentType["MOV"] = "video/mov";
})(SupportedContentType || (SupportedContentType = {}));
//# sourceMappingURL=supportedContentType.js.map
