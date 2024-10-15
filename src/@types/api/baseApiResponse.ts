/**
 * The base shape of the response from Photostation's authentication API.
 */
interface BaseApiResponse {
  success: boolean;
  error?: {
    code: string;
  };
}

export default BaseApiResponse;
