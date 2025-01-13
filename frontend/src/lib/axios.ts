import axios from "axios";

export const postAxios = async (url: string, data?: unknown) => {
  const res = await axios.post(url, data);
  return res;
};

export const getAxios = async (url: string, params: URLSearchParams = new URLSearchParams()) => {
  const res = await axios.get(url + params, { withCredentials: true });
  return res;
};
