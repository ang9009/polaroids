/**
 * Converts a list of urls into a list of Blob objects representing images from
 * each url.
 * @param urls a list of image urls
 * @returns a list of corresponding Blob images
 */
const getBlobsFromUrls = async (urls: string[]): Promise<Blob[]> => {
  const blobPromises = urls.map(async (url) => {
    const res = await fetch(url);
    return res.blob();
  });
  return await Promise.all(blobPromises);
};

export default getBlobsFromUrls;
