import axios from "axios";
import { z } from "zod";
import { FileStationCredentials } from "./fileStationCredentials";

/**
 * Retrieves a file from FileStation. The name of the file must follow the
 * format discordId.extension.
 * @param fileName the name of the file
 * @returns the desired file
 */
export const getFileFromFS = async (fileName: string): Promise<Buffer> => {
  const { FS_API_URL } = process.env;
  const { sessionId, synoToken } = await FileStationCredentials.getInstance();
  const url =
    `${FS_API_URL}/webapi/FileStation/file_thumb.cgi?api=SYNO.FileStation.Thumb` +
    `&method=get&version=1&SynoToken=${synoToken}&size=large&path=%2Fpolaroids%2F${fileName}`;
  const headers = {
    Cookie: `stay-login=1; id=${sessionId}`,
    "X-SYNO-TOKEN": synoToken,
  };

  const res = await axios.get(url, { headers, responseType: "arraybuffer" });
  const parseRes = z.instanceof(Buffer).safeParse(res.data);
  if (!parseRes.success) {
    throw Error("Unexpected response from FileStation: " + res.data);
  }
  return parseRes.data;
};
