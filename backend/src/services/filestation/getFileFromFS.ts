import { z } from "zod";
import { getApiClient } from "../../lib/axios";
import { FSShareLinkResponseSchema } from "../../types/response-schemas/FSShareLinkResponse";

/**
 * Retrieves a file from FileStation. The name of the file must follow the
 * format discordId.extension.
 * @param fileName the name of the file
 * @returns the desired file
 */
export const getFileFromFS = async (fileName: string): Promise<Buffer> => {
  const apiClient = await getApiClient();

  const url = await getFSFileSharingLink(fileName);
  const res = await apiClient.get(url, { responseType: "arraybuffer" });

  const parseRes = z.instanceof(Buffer).safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Unexpected response from FileStation: " + res.data);
  }
  return parseRes.data;
};

/**
 * Retrieves a temporary file ssharing link for the file with the given name
 * from FileStation.
 * @param fileName the name of the file (must follow the format discordId.extension.)
 * @returns the file sharing link for the specified file
 */
const getFSFileSharingLink = async (fileName: string) => {
  const { FS_API_URL } = process.env;
  const url = `${FS_API_URL}/webapi/FileStation/file_sharing.cgi`;
  const data = new URLSearchParams({
    path: `/polaroids/${fileName}`,
    api: "SYNO.FileStation.Sharing",
    method: "create",
    version: "1",
  });

  const apiClient = await getApiClient();
  const res = await apiClient.post(url, data.toString());
  const parseRes = FSShareLinkResponseSchema.safeParse(res.data);
  if (!parseRes.success) {
    throw Error(
      "Failed to parse response to file sharing link request: " + JSON.stringify(res.data)
    );
  }
  const {
    data: { links },
  } = parseRes.data;
  return links[0].url;
};
