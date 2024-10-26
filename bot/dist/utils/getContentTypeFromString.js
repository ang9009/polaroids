import { SupportedContentType } from "../@types/supportedContentType.js";
/**
 * Returns the associated SupportedContentType enum given a file extension.
 * @param fileExtension the file extension in question
 * @returns the associated SupportContentType enum
 * @throws an error if the file extension is not recognized.
 */
const getContentTypeFromString = (fileExtension) => {
    const contentTypeExtensions = Object.values(SupportedContentType);
    const typeEnum = contentTypeExtensions.find((currFileType) => currFileType === fileExtension);
    if (!typeEnum) {
        throw new Error(`Content type not recognized: ${fileExtension}`);
    }
    return typeEnum;
};
export default getContentTypeFromString;
//# sourceMappingURL=getContentTypeFromString.js.map