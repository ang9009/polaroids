import { AllowedMimeType } from "./allowedMimeType";
import { mimetypeToExtension } from "./mimetypeToExtension";

export const extensionToMimetype: Record<string, AllowedMimeType> = Object.entries(
  mimetypeToExtension
).reduce((acc, [mime, extension]) => {
  acc[extension] = mime as AllowedMimeType;
  return acc;
}, {} as Record<string, AllowedMimeType>);
