import { NamedBlob } from "../types/namedBlob";

/**
 * Returns the blob and its name fetched from the given url.
 * @param url the url
 * @param fileName the name of the original file
 * @returns the file from the given url and its name
 */
export const getBlobFromUrl = async (url: string, fileName: string): Promise<NamedBlob> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return { blob: blob, name: fileName };
};
