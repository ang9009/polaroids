import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { AlbumRequestType } from "shared/src/requests/subscribed-channels/types/albumRequestType";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { apiClient } from "../../../lib/axios";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
/**
 * Creates an album, then subscribes polaroids to the given channel and links it
 * to the newly created album. Note that the channel should not be subscribed to before.
 * @param albumName the name of the new album
 * @param albumDesc the album's description
 * @param channelId the id of the channel in question
 * @param guildId the id of the guild the channel is in
 */
export const subscribeChannelWithNewAlbum = async (albumName, albumDesc, channelId, guildId) => {
    const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS);
    const data = {
        channelId,
        albumRequestType: AlbumRequestType.CREATE_NEW,
        albumName,
        guildId,
        albumDesc,
    };
    try {
        await apiClient.post(url, data);
    }
    catch (err) {
        if (isAxiosErrorResponse(err)) {
            const errorRes = err.response?.data;
            if (isDbExceptionResponse(errorRes)) {
                const { dbErrorCode } = errorRes;
                if (dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
                    throw Error(`An album with the name ${albumName} already exists. Please try again.`);
                }
            }
        }
        throw err;
    }
};
//# sourceMappingURL=subscribeChannelWithNewAlbum.ts.js.map