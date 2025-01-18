export const mimeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "audio/wav": "wav",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/x-msvideo": "avi",
};

export const extensionToMime: Record<string, string> = Object.entries(mimeToExtension).reduce(
  (acc, [mime, extension]) => {
    acc[extension] = mime;
    return acc;
  },
  {} as Record<string, string>
);

/**
 * Returns the associated extension of the given MIME type.
 * @param mimeType the MIME type in question
 * @returns the corresponding extension
 */
export const getExtensionFromMimeType = (mimeType: string) => {
  if (mimeToExtension[mimeType]) {
    return mimeToExtension[mimeType];
  }
  throw Error("Unrecognized MIME type " + mimeType);
};
