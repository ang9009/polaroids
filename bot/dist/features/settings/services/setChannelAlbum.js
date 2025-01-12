import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { isAxiosErrorResponse } from "../../../utils/ensureAxiosErrorResponse";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";
import { isDbExceptionResponse } from "../../../utils/isDbExceptionResponse";
import { apiClient } from "../../../lib/axios";
/**
 * Links a channel to a new existing album. Includes the option of creating a channel.
 * @param albumId the id of the new album
 * @param channelId the id of the channel in question
 * @param guildId the id of the guild that the channel is in
 */
export const setChannelAlbum = async (albumId, channelId, guildId) => {
    // If already subscribed, then no need to add channel id
    const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "link-existing-album");
    const data = { guildId, channelId, albumId };
    try {
        await apiClient.patch(url, data);
    }
    catch (err) {
        if (isAxiosErrorResponse(err)) {
            const errorRes = err.response?.data;
            if (isDbExceptionResponse(errorRes)) {
                const { dbErrorCode } = errorRes;
                if (dbErrorCode === DbErrorCode.DEPENDENCY_RECORD_NOT_FOUND) {
                    throw Error(`polaroids is no longer subscribed to this channel. Please try again.`);
                }
                else if (dbErrorCode === DbErrorCode.FOREIGN_KEY_CONSTRAINT_VIOLATION) {
                    throw Error("The specified album no longer exists. Please try again.");
                }
            }
        }
        throw err;
    }
};
//# sourceMappingURL=setChannelAlbum.js.map