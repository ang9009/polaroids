import { z } from "zod";
import HttpStatusCode from "../../data/statusCodes";

/**
 * An exception that has an HTTP status code tied to it.
 */
interface HttpException extends Error {
  readonly status: HttpStatusCode;
  getResponse(): unknown;
}

export const HttpExceptionSchema = z.object({
  status: z.nativeEnum(HttpStatusCode),
  getResponse: z.function(),
});

export { HttpException };
