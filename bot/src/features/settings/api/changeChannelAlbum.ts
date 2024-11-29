import axios, { isAxiosError } from "axios";
import { UpdateChannelAlbumReq } from "shared/src/subbed-channel-requests/updateChannelAlbumReq";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
/**
 * Links a subscribed channel to a new existing album.
 * @param albumName the name of the new album
 * @param channelId the id of the channel in question
 * @param guildId the id of the guild that the channel is in
 */
export const changeChannelAlbum = async (albumName: string, channelId: string, guildId: string) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-existing-album");
  const data: UpdateChannelAlbumReq = { guildId, channelId, albumName };

  try {
    await axios.patch(url, data);
  } catch (err) {
    if (isAxiosError(err)) {
      throw Error("An error occurred while making a request in changeChannelAlbum: " + err.message);
    }

    throw Error("An error occurred while making a request in changeChannelAlbum");
  }
};
