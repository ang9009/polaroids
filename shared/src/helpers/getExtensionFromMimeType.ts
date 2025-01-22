import { mimetypeToExtension } from "../data/mimetypeToExtension";

export const extensionToMime: Record<string, string> = Object.entries(mimetypeToExtension).reduce(
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
  if (mimetypeToExtension[mimeType]) {
    return mimetypeToExtension[mimeType];
  }
  throw Error("Unrecognized MIME type " + mimeType);
};
