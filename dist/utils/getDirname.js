import { dirname } from "path";
import { fileURLToPath } from "url";
/**
 * A helper function that returns the current directory's name as a string.
 * @param moduleUrl the url of the module
 * @returns the current directory's name as a string
 */
const getDirname = (moduleUrl) => {
    return dirname(fileURLToPath(moduleUrl));
};
export default getDirname;
//# sourceMappingURL=getDirname.js.map