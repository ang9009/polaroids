import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";

/**
 * Represents when a request does not have the necessary parameters/parameters
 * don't have the right types.
 */
class NotFoundException implements HttpException {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HttpStatusCode = HttpStatusCode.BAD_REQUEST;

  constructor() {
    this.name = "NotFoundException";
    this.message = "Not found";
  }

  public getResponse(): { [key: string]: string } {
    return { message: this.message };
  }
}

export default NotFoundException;
