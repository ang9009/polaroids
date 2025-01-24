import { CancelToken } from "axios";
import { AllowedMimeType } from "shared/src/data/allowedMimeType";
import { z } from "zod";
import { apiClient } from "../lib/axios";

/**
 * Downloads a file that matches the given parameters.
 * @param {string} discordId the file's Discord attachment id
 * @param {string} mimetype the file's mimetype
 * @param {boolean} thumbnail whether the specified file's thumbnail should be fetched
 * @param {CancelToken} cancelToken a token used to cancel the request
 * request if needed
 * @returns {Promise<Blob>} the requested file
 */
export const getFile = async (
  discordId: string,
  mimetype: AllowedMimeType,
  thumbnail: boolean,
  cancelToken: CancelToken,
): Promise<Blob> => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/files/download`;
  const req = {
    thumbnail: `${thumbnail}`,
    discordId,
    mimetype,
  };
  const params = new URLSearchParams(req);
  const res = await apiClient.get(url, { params, cancelToken, responseType: "blob" });

  const parseRes = z.instanceof(Blob).safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Got unexpected response while fetching media: " + parseRes.error);
  }
  return parseRes.data;
};
