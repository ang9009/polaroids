import { AxiosResponse } from "axios";
import { BaseApiResponse } from "../../../@types/api/baseApiResponse";

/**
 * Validates the given PhotoStation6 (PS) API response and returns its data as the
 * desired response type.
 * @template T the expected type of the API response
 * @param res the response from the PhotoStation6 API
 * @returns the data from res as a BaseApiResponse object
 * @throws Error if the response object indicates that the response failed
 */
export function getValidatedPSData<T extends BaseApiResponse>(res: AxiosResponse): T {
  const data = res.data as T;
  if (!data.success) {
    throw new Error(`An error occurred (${data.error!.code})`);
  }
  return data;
}
