import axios from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { CreateAndLinkAlbumRequest } from "shared/src/requests/subscribed-channels/createAlbumAndLinkChannel";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";

/**
 * Creates an album based on the fields in the given modal submit interaction
 * object, and links the channel with the given channel id to it.
 * @param albumName the name of the album
 * @param albumDesc the album's description
 * @param channelId the id of the channel
 * @param guildId the id of the guild the channel is in
 */
export const createAlbumAndLinkChannel = async (
  albumName: string,
  albumDesc: string | undefined,
  channelId: string,
  guildId: string,
) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-new-album");
  const data: CreateAndLinkAlbumRequest = { guildId, channelId, albumName, albumDesc };

  try {
    await axios.patch(url, data);
  } catch (err) {
    if (isAxiosErrorResponse(err)) {
      const errorRes = err.response?.data;
      if (isDbExceptionResponse(errorRes)) {
        const { dbErrorCode } = errorRes;
        if (dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          throw Error(`An album with the name ${albumName} already exists. Please try again.`);
        } else if (dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND) {
          throw Error("polaroids is no longer subscribed to this channel. Please try again.");
        }
      }
    }

    throw err;
  }
};
