/**
 * Converts a list of urls into a list of Blob objects representing images from
 * each url.
 * @param urls a list of image urls
 * @returns the corresponding Blob images
 */
const getImgsFromUrls = (urls: string[]): Promise<Blob>[] => {
  return urls.map(async (url) => {
    const res = await fetch(url);
    return res.blob();
  });
};

export default getImgsFromUrls;
