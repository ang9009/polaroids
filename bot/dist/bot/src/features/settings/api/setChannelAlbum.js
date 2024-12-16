import axios from "axios";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
/**
 * Links a channel to a new existing album. Includes the option of creating a channel.
 * @param albumName the name of the new album
 * @param channelId the id of the channel in question
 * @param guildId the id of the guild that the channel is in
 */
export const setChannelAlbum = async (albumName, channelId, guildId) => {
    // If already subscribed, then no need to add channel id
    const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-existing-album");
    const data = { guildId, channelId, albumName };
    await axios.patch(url, data);
};
//# sourceMappingURL=setChannelAlbum.js.map