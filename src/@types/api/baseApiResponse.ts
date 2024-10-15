/**
 * The base shape of the response from Photostation's authentication API. If
 * success is true, then error will be undefined. If success is false, error
 * will hold the error code.
 */
interface BaseApiResponse {
  success: boolean;
  error?: {
    code: number;
  };
}

export default BaseApiResponse;
