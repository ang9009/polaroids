import axios from "axios";

export const apiClient = axios.create({ withCredentials: true });

/**
 * Sends a POST request via Axios.
 * @param {string} url the url the request should be made to
 * @param {unknown} data the data that should be sent
 * @returns {Promise<unknown>} the response object
 */
export const postAxios = async (url: string, data?: unknown): Promise<unknown> => {
  const res = await apiClient.post(url, data);
  return res.data;
};

/**
 * Sends a GET request via Axios.
 * @param {string} url the url the request should be made to
 * @param {URLSearchParams} params the params attached to the request
 * @returns {Promise<unknown>} the response object
 */
export const getAxios = async (
  url: string,
  params: URLSearchParams = new URLSearchParams(),
): Promise<unknown> => {
  const res = await apiClient.get(url + params);
  return res.data;
};
