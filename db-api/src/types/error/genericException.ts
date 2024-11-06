import HttpStatusCode from "../../data/statusCodes";
import HttpException from "./httpException";

/**
 * A generic exception that is thrown when an unknown exception type occurs.
 * Allows for a message to be provided.
 */
class GenericException implements HttpException {
  public readonly status: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  public readonly name: string;
  public readonly message: string;

  public constructor(message: string) {
    this.message = message;
    this.name = "RuntimeException";
  }

  public getResponse(): { [key: string]: string } {
    return { message: this.message };
  }
}

export default GenericException;
