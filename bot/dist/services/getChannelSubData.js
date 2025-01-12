import { IsSubscribedResponseSchema, } from "shared/src/responses/subscribed-channels/isSubscribed";
import { DbApiRoutes } from "../data/dbApiRoutes";
import { apiClient } from "../lib/axios";
import { getDbApiUrl } from "../utils/getDbApiUrl";
/**
 * Checks if polaroids has subscribed to a given channel. If it has, this
 * returns the album that the channel is linked to as well.
 * @param channelId the id of the channel in question
 * @returns a boolean
 * @throws Error if something goes wrong with the request
 */
export const getChannelSubData = async (channelId) => {
    const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "is-subscribed", channelId);
    let res;
    try {
        res = await apiClient.get(url);
    }
    catch (err) {
        throw Error("channelIsSubscribed Axios request failed: " + err);
    }
    const parsedRes = IsSubscribedResponseSchema.safeParse(res.data);
    if (parsedRes.success) {
        return parsedRes.data;
    }
    else {
        throw Error("Failed to parse channelIsSubscribed request response: " + parsedRes.error);
    }
};
//# sourceMappingURL=getChannelSubData.js.map