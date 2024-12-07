import { AxiosResponse } from "axios";
import { z } from "zod";
/**
 * Validates a response from FileStation, and returns the data from the request
 * @param response the response object
 * @param schema the schema used to parse the response
 * @returns the data property from the response
 * @throws Error if the FileStation response was unsuccessful/shape is invalid, or if
 *         the response data property's shape is invalid
 */
export declare const validateFSResponse: <T extends z.ZodTypeAny>(response: AxiosResponse, schema: T) => z.infer<T>;
