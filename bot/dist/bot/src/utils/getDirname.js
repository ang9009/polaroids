import { dirname } from "path";
import { fileURLToPath } from "url";
/**
 * A helper function that returns the current directory's name as a string.
 * @param moduleUrl the url of the module
 * @returns the current directory's name as a string
 */
export const getDirname = (moduleUrl) => {
    return dirname(fileURLToPath(moduleUrl));
};
//# sourceMappingURL=getDirname.js.map