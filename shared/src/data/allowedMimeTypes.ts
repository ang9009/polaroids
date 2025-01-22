export enum AllowedMimeTypes {
  JPEG = "image/jpeg",
  PNG = "image/png",
  GIF = "image/gif",
  WEBP = "image/webp",
  BMP = "image/bmp",
  TIFF = "image/tiff",
  MP4 = "video/mp4",
  WEBM = "video/webm",
  MOV = "video/quicktime",
}

/**
 * Returns whether the given string is an allowed MIME type.
 * @param mimetype the string in question
 * @returns whether it is an allowed MIME type
 */
export const isAllowedMimeType = (mimetype: string): mimetype is AllowedMimeTypes => {
  const types = Object.values(AllowedMimeTypes);
  return !!types.includes(mimetype as AllowedMimeTypes);
};
