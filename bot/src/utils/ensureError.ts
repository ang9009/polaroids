// Taken from
// https://medium.com/with-orus/the-5-commandments-of-clean-error-handling-in-typescript-93a9cbdf1af5.
// Credit to Marvin Roger.

/**
 * Ensures that the given error is an Error object. If not, it is stringified and put
 * into a new Error.
 * @param value the error object in question
 * @returns the original error object, or a new one
 */
function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(`An unknown error occurred: ${stringified}`);
  return error;
}

export { ensureError };
