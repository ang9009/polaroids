import { CancelToken } from "axios";
import { AllowedMimeType } from "shared/src/data/allowedMimeType";
import { GetFileLinkResponseSchema } from "shared/src/responses/files/getFileLink";
import { apiClient } from "../lib/axios";

/**
 * Downloads a file that matches the given parameters.
 * @param {string} discordId the file's Discord attachment id
 * @param {string} mimetype the file's mimetype
 * @param {boolean} thumbnail whether the specified file's thumbnail should be fetched
 * @param {CancelToken} cancelToken an optional token used to cancel the request
 * request if needed
 * @returns {Promise<string>} the requested file url
 */
export const getFileUrl = async (
  discordId: string,
  mimetype: AllowedMimeType,
  thumbnail: boolean,
  cancelToken?: CancelToken,
): Promise<string> => {
  const { VITE_API_URL } = import.meta.env;
  const url = `${VITE_API_URL}/files/link`;
  const req = {
    thumbnail: `${thumbnail}`,
    discordId,
    mimetype,
  };
  const params = new URLSearchParams(req);
  const res = await apiClient.get(url, { params, cancelToken });

  const parseRes = GetFileLinkResponseSchema.safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Got unexpected response while fetching media: " + parseRes.error);
  }
  return parseRes.data.url;
};
