import { isAxiosError } from "axios";
import { TextBasedChannel } from "discord.js";
import { filterForNotUploadedFiles } from "../../event-triggers/api/filterForNotUploadedFiles";
import { FileData } from "../../event-triggers/types/fileData";
import { getChannelFilesData } from "../../utility/helpers/getChannelAttachments";
import { getLatestMsg } from "../../utility/helpers/getLatestMsg";

/**
 * Retrieves all the non-uploaded files in a channel. If there are no such
 * files, this throws an appropriate error.
 * @param channel the channel in question
 * @returns the non-uploaded files
 */
export const getChannelNonUploadedFiles = async (
  channel: TextBasedChannel,
): Promise<FileData[]> => {
  const latestMsg = await getLatestMsg(channel);
  const filesData: FileData[] = await getChannelFilesData(latestMsg, channel);
  if (filesData.length === 0) {
    throw Error("No previously uploaded attachments were found.");
  }

  let nonUploadedFilesData: FileData[];
  try {
    nonUploadedFilesData = await filterForNotUploadedFiles(filesData);
  } catch (err) {
    if (isAxiosError(err)) {
      throw Error(`Request to check for non uploaded files failed: ${err.message}.`);
    }
    throw Error("Request to check for non uploaded files failed.");
  }
  if (nonUploadedFilesData.length === 0) {
    throw Error("All the attachments in this channel have already been archived.");
  }

  return nonUploadedFilesData;
};
