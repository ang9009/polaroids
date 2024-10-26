import { File } from "@web-std/file";
/**
 * Takes the url to an attachment, gets the attachment and converts it into a
 * File object.
 * @param url the url to the attachment
 * @param name the name of the resulting file
 * @returns a File object corresponding to the attachment
 */
export const getFileFromUrl = async (url, name) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], name);
};
//# sourceMappingURL=getFileFromUrl.js.map