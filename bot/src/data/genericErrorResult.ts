import { Result } from "../types/result";

/**
 * A generic error Result object, returned from api-related functions when an
 * unknown error occurs.
 */
export const genericErrorResult: Result<void> = {
  success: false,
  error: "Something went wrong. Please contact dalfie.",
};
