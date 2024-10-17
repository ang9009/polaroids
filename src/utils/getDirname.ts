import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * A helper function that returns the current directory's name as a string.
 * @param moduleUrl the url of the module
 * @returns the current directory's name as a string
 */
export const getDirname = (moduleUrl: string): string => {
  return dirname(fileURLToPath(moduleUrl));
};
