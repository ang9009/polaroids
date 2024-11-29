import axios from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { DbExceptionResponseSchema } from "shared/src/error-responses/dbExceptionResponse";
import { CreateAndLinkAlbum } from "shared/src/subbed-channel-requests/createAlbumAndLinkChannelReqBody";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { Result } from "../../../types/result";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Creates an album based on the fields in the given modal submit interaction
 * object, and links the given channel id to it, which corresponds to a channel
 * that polaroids is already subscribed to.
 * @param albumName the name of the album
 * @param albumDesc the album's description
 * @param channelId the id of the channel
 * @param guildId the id of the guild the channel is in
 * @returns a Result object indicating whether the request was successful
 */
export const createAlbumAndLinkChannel = async (
  albumName: string,
  albumDesc: string,
  channelId: string,
  guildId: string,
): Promise<Result<void>> => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-new-album");
  const data: CreateAndLinkAlbum = { guildId, channelId, albumName, albumDesc };

  try {
    await axios.patch(url, data);
  } catch (err) {
    const parseRes = DbExceptionResponseSchema.safeParse(err);
    if (parseRes.success) {
      const data = parseRes.data;
      if (data.dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
        return { success: false, error: "An album with this name already exists." };
      }
    }

    throw Error("createAlbumAndLinkExistingChannel Axios request failed: " + err);
  }

  return { success: true, data: undefined };
};
