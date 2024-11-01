import HttpStatusCode from "../data/statusCodes";

/**
 * Represents an API error, which has an optional status code and the Error object.
 */
export class HttpException extends Error {
  constructor(public status: HttpStatusCode, message?: string) {
    super(message);
  }
}
