import { AllowedMimeType } from "../data/allowedMimeType";
/**
 * Returns the associated extension of the given MIME type.
 * @param mimeType the MIME type in question
 * @returns the corresponding extension
 */
export declare const getExtensionFromMimetype: (mimeType: AllowedMimeType) => string;
