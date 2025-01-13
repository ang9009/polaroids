import axios from "axios";

export const postAxios = async (url: string, data?: unknown) => {
  const res = await axios.post(url, data);
  return res;
};
