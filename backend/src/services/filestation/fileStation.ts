import axios, { isAxiosError } from "axios";
import { getExtensionFromMimeType } from "shared/src/helpers/getExtensionFromMimeType";
import { z } from "zod";
import { getApiClient } from "../../lib/axios";
import { FSUploadResponse, FSUploadResponseSchema } from "../../types/filestation/FSUploadResponse";
import {
  FSShareLinkResponse,
  FSShareLinkResponseSchema,
} from "../../types/response-schemas/FSShareLinkResponse";
import { FileStationCredentials } from "./fileStationCredentials";

/**
 * An API for interacting with FileStation.
 */
export class FileStation {
  /**
   * Uploads the given files to FileStation.
   * @param files the files to be uploaded
   */
  public static uploadFilesToFS = async (files: Express.Multer.File[]) => {
    for (const file of files) {
      await FileStation.refetchIfInvalidFSCredentials(async () => {
        const res = await this.uploadFile(file);
        if (!res.success) {
          throw Error("Failed to upload file to FileStation: " + res);
        }
      });
    }
  };

  /**
   * Uploads a singular file to FileStation.
   * @param file the file to be uploaded
   * @returns FileStation's response to the upload
   */
  private static async uploadFile(file: Express.Multer.File): Promise<FSUploadResponse> {
    const { FS_API_URL, FS_FOLDER_PATH } = process.env;
    const { sessionId, synoToken } = await FileStationCredentials.getInstance();

    // Set up url and headers
    const url = `${FS_API_URL}/webman/modules/FileBrowser/webfm/webUI/html5_upload.cgi`;
    const headers = {
      Cookie: `stay-login=1; id=${sessionId}`,
      "X-SYNO-TOKEN": synoToken,
    };

    // Set up form data
    const form = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    form.append("overwrite", "false");
    form.append("path", FS_FOLDER_PATH!);
    const discordId = file.originalname;
    const extension = getExtensionFromMimeType(file.mimetype);
    form.append("file", blob, `${discordId}.${extension}`);

    const res = await axios.post(url, form, { headers: headers });
    const parsedRes = FSUploadResponseSchema.safeParse(res.data);
    if (!parsedRes.success) {
      throw Error("Got unexpected response from file upload: " + JSON.stringify(res.data));
    }

    return parsedRes.data;
  }

  /**
   * Retrieves a file from FileStation. The name of the file must follow the
   * format discordId.extension.
   * @param fileName the name of the file
   * @returns the desired file
   */
  public static getFileFromFS = async (fileName: string): Promise<Buffer> => {
    const apiClient = await getApiClient();

    const url = await FileStation.getFSFileSharingLink(fileName);
    const res = await FileStation.refetchIfInvalidFSCredentials<Buffer>(async () => {
      const res = await apiClient.get(url, { responseType: "arraybuffer" });
      const parseRes = z.instanceof(Buffer).safeParse(res.data);
      if (!parseRes.success) {
        throw Error("Unexpected response from FileStation: " + res.data);
      }
      return parseRes.data;
    });

    return res;
  };

  /**
   * Retrieves a temporary file sharing link for the file with the given name
   * from FileStation.
   * @param fileName the name of the file (must follow the format discordId.extension.)
   * @returns the file sharing link for the specified file
   */
  private static getFSFileSharingLink = async (fileName: string) => {
    const { FS_API_URL } = process.env;
    const url = `${FS_API_URL}/webapi/FileStation/file_sharing.cgi`;
    const data = new URLSearchParams({
      path: `/polaroids/${fileName}`,
      api: "SYNO.FileStation.Sharing",
      method: "create",
      version: "1",
    });

    const apiClient = await getApiClient();
    const res = await FileStation.refetchIfInvalidFSCredentials<FSShareLinkResponse>(async () => {
      const res = await apiClient.post(url, data.toString());
      const parseRes = FSShareLinkResponseSchema.safeParse(res.data);
      if (!parseRes.success) {
        throw Error(
          "Failed to parse response to file sharing link request: " + JSON.stringify(res.data)
        );
      }
      return parseRes.data;
    });

    const { links } = res.data;
    return links[0].url;
  };

  /**
   * Attempts to refresh the currently saved FileStation credentials if a given
   * FileStation request fails (throws an error), then re-attempts the request.
   * Note that it is up to the caller to make the passed function throw an error.
   * @param fsRequest the request in question
   * @returns the result of the request
   */
  private static refetchIfInvalidFSCredentials = async <T>(
    fsRequest: () => Promise<T>
  ): Promise<T> => {
    let error;

    for (let retries = 0; retries < 3; retries++) {
      try {
        return await fsRequest();
      } catch (err) {
        error = err;
        await FileStationCredentials.updateFSCredentials();
      }
    }

    if (isAxiosError(error)) {
      throw error;
    }
    throw new Error("Request failed: " + error);
  };
}
