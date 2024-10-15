import BaseApiResponse from "./baseApiResponse";

/**
 * The shape of the response from Photostation's authentication API after
 * logging in.
 */
export interface LoginApiResponse extends BaseApiResponse {
  data?: {
    sid: string;
  };
}

/**
 * The shape of the response from Photostation's authentication API after
 * checking if a sessionId is valid using the checkauth method. If the username is
 */
export interface CheckAuthApiResponse {
  data?: {
    sid: string;
    username: string | undefined;
  };
}
