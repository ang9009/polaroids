import axios from "axios";

/**
 *
 * @param url
 */
export const getFileFromUrl = async (url: string) => {
  const res = await axios.get(url);
  console.log(res.data);
};
