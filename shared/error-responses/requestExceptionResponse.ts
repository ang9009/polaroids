import ErrorResponse from "../error-responses/errorResponse";

interface RequestExceptionResponse extends ErrorResponse {
  invalidParams: string;
}

export default RequestExceptionResponse;
