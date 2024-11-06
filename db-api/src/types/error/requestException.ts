import { ZodError } from "zod";
import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";

/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class RequestException implements HttpException {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HttpStatusCode = HttpStatusCode.BAD_REQUEST;

  constructor(invalidParams: ZodError) {
    this.name = "RequestException";
    this.message = invalidParams.message;
  }

  public getResponse(): { [key: string]: string } {
    return { invalidParams: this.message };
  }
}

export default RequestException;
