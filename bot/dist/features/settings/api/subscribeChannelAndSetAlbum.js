import axios from "axios";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
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
    try {
        await axios.post(url, data);
    }
    catch (err) {
        if (isAxiosErrorResponse(err)) {
            const errorRes = err.response?.data;
            if (isDbExceptionResponse(errorRes)) {
                const { dbErrorCode } = errorRes;
                if (dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND) {
                    throw Error(`polaroids is no longer subscribed to this channel. Please try again.`);
                }
                else if (dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw Error(`polraoids is already subscribed to this channel.`);
                }
            }
        }
        throw err;
    }
};
//# sourceMappingURL=subscribeChannelAndSetAlbum.js.map