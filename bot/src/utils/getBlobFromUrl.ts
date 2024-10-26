/**
 * Takes the url to an attachment, gets the attachment and converts it into a
 * File object.
 * @param url the url to the attachment
 * @returns a Blob object corresponding to the attachment
 */
export const getBlobFromUrl = async (url: string): Promise<Blob> => {
  const res = await fetch(url);
  return await res.blob();
};
