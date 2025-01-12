import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { AddSubbedChannelRequest } from "shared/src/requests/subscribed-channels/addSubbedChannel";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
import { apiClient } from "../../../lib/axios";

/**
 * Subscribes polaroids to the given channel, then sets its linked album to a
 * given existing album.
 * @param albumId the id of the album
 * @param channelId the id of the channel
 * @param guildId the id of the guild the channel is in
 */
export const subscribeChannelAndSetAlbum = async (
  albumId: string,
  channelId: string,
  guildId: string,
) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS);
  const data: AddSubbedChannelRequest = {
    channelId,
    albumRequestType: AlbumRequestType.EXISTING,
    albumId,
    guildId,
  };

  try {
    await apiClient.post(url, data);
  } catch (err) {
    if (isAxiosErrorResponse(err)) {
      const errorRes = err.response?.data;
      if (isDbExceptionResponse(errorRes)) {
        const { dbErrorCode } = errorRes;
        if (dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND) {
          throw Error(`polaroids is no longer subscribed to this channel. Please try again.`);
        } else if (dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
          throw Error(`polraoids is already subscribed to this channel.`);
        } else if (dbErrorCode === DbErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION) {
          throw Error("The specified album no longer exists. Please try again.");
        }
      }
    }

    throw err;
  }
};
