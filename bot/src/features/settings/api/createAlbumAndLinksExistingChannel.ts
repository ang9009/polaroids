import axios from "axios";
import { UpdateChannelAlbumReqBody } from "shared/subbed-channel-requests/updateChannelAlbumReqBody";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Creates an album based on the fields in the given modal submit interaction
 * object, and links the given channel id to it, which corresponds to a channel
 * that polaroids is already subscribed to.
 * @param albumName the name of the album
 * @param albumDesc the album's description
 * @param channelId the id of the channel
 * @param guidlId the id of the guild the channel is in
 */
export const createAlbumAndLinkExistingChannel = async (
  albumName: string,
  albumDesc: string,
  channelId: string,
  guidlId: string,
) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS);
  const data: UpdateChannelAlbumReqBody = { guildId, channelId, albumName };
  axios.patch(url);
};
