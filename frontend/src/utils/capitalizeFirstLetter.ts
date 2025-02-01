/**
 * Capitalizes the first letter of the given string.
 * @param {string} str the string in question
 * @returns {string} the same string, with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
