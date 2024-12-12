import axios from "axios";
import { AlbumRequestType } from "shared/src/requests/subbed-channel-requests/types/albumRequestType";
import { AddSubChannelReqBody } from "../../../../../db-api/src/types/request-schemas/addSubChannelReqBody";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Creates an album, then subscribes polaroids to the given channel and links it
 * to the newly created album. Note that the channel should not be subscribed to before.
 * @param albumName the name of the new album
 * @param albumDesc the album's description
 * @param channelId the id of the channel in question
 * @param guildId the id of the guild the channel is in
 */
export const subscribeChannelWithNewAlbum = async (
  albumName: string,
  albumDesc: string,
  channelId: string,
  guildId: string,
) => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS);
  const data: AddSubChannelReqBody = {
    channelId,
    albumRequestType: AlbumRequestType.CREATE_NEW,
    albumName,
    guildId,
    albumDesc,
  };

  await axios.post(url, data);
};
