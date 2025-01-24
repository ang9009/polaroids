import { AllowedMimeType } from "../data/allowedMimeType";
import { extensionToMimetype } from "../data/extensionToMimetype";

/**
 * Returns the associated MIME type of the given extension.
 * @param extension the extension in question
 * @returns the corresponding extension
 */
export const getMimetypeFromExtension = (extension: string): AllowedMimeType => {
  if (!extensionToMimetype[extension]) {
    throw Error("Unrecognized extension" + extension);
  }

  return extensionToMimetype[extension];
};
