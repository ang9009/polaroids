/**
 * Converts an integer number of bytes into a readable string representation.
 * @param bytes the number of bytes
 * @returns a corresponding string representation
 */
const formatBytes = (bytes: number): string => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default formatBytes;
