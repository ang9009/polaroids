import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * A helper function that returns the
 * @param moduleUrl
 * @returns
 */
const getDirname = (moduleUrl: string): string => {
  return dirname(fileURLToPath(moduleUrl));
};

export default getDirname;
