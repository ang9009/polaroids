import { AxiosResponse } from "axios";
import { z } from "zod";
import { FSResponseSchema } from "../types/response-schemas/FSResponse";

/**
 * Validates a response from FileStation, and returns the data from the request
 * @param response the response object
 * @param schema the schema used to parse the response
 * @returns the data property from the response
 * @throws Error if the FileStation response was unsuccessful/shape is invalid, or if
 *         the response data property's shape is invalid
 */
export const validateFSResponse = <T extends z.ZodTypeAny>(
  response: AxiosResponse,
  schema: T
): z.infer<T> => {
  const fsParsedResponse = FSResponseSchema.safeParse(response.data);
  if (!fsParsedResponse.success) {
    throw Error("Got unexpected response from FileStation: " + JSON.stringify(response.data));
  }

  // FileStation returns a success property in its response
  const fsResponse = fsParsedResponse.data;
  if (!fsResponse.success) {
    throw Error(`FileStation request failed. Error code: ${fsResponse.error.code}`);
  }

  const parsedResponseData = schema.safeParse(fsResponse.data);
  if (!parsedResponseData.success) {
    throw Error(
      "Request was successful, but got unexpected data property shape: " +
        JSON.stringify(fsResponse.data)
    );
  }

  return parsedResponseData.data;
};
