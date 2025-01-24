import { mimetypeToExtension } from "./mimetypeToExtension";
export const extensionToMimetype = Object.entries(mimetypeToExtension).reduce((acc, [mime, extension]) => {
    acc[extension] = mime;
    return acc;
}, {});
//# sourceMappingURL=extensionToMimetype.js.map