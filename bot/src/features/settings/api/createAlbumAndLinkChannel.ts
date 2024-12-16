import axios from "axios";
import { CreateAndLinkAlbumRequest } from "shared/src/requests/subscribed-channels/createAlbumAndLinkChannel";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

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
  albumDesc: string,
  channelId: string,
  guildId: string,
) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-new-album");
  const data: CreateAndLinkAlbumRequest = { guildId, channelId, albumName, albumDesc };

  await axios.patch(url, data);
};
