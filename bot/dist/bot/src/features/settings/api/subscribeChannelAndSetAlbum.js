import axios from "axios";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
/**
 * Subscribes polaroids to the given channel, then sets its linked album to a
 * given existing album.
 * @param albumName the name of the album
 * @param channelId the id of the channel
 * @param guildId the id of the guild the channel is in
 */
export const subscribeChannelAndSetAlbum = async (albumName, channelId, guildId) => {
    const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS);
    const data = {
        channelId,
        albumRequestType: AlbumRequestType.EXISTING,
        albumName,
        guildId,
    };
    await axios.post(url, data);
};
//# sourceMappingURL=subscribeChannelAndSetAlbum.js.map