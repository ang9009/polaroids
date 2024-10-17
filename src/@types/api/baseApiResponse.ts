/**
 * The base shape of the response from Photostation's authentication API. If
 * success is true, then error will be undefined. If success is false, error
 * will contain the error code.
 */
export interface BaseApiResponse {
  success: boolean;
  error?: {
    code: number;
  };
}
