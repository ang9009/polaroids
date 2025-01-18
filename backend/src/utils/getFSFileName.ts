/**
 * Returns the name of the file as it is stored on FileStation. File names on
 * FileStation should follow the format discordId.fileExtension.
 * @param discordId the discordId of the file
 * @param extension the file's extension
 * @returns the file's name on FileStation
 */
export const getFSFileName = (discordId: string, extension: string) => {
  return `${discordId}.${extension}`;
};
