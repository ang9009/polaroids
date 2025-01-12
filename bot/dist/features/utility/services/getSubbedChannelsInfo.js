import { GetSubbedChannelsResponseSchema, } from "shared/src/responses/subscribed-channels/getSubbedChannels";
import { apiClient } from "../../../lib/axios";
/**
 * Retrieves information about all the channels that polaroids is subscribed to
 * in a specified guild.
 * @param guildId the id of the guild
 * @returns information regarding its subscribed channels (linked album and
 *          channel ids)
 */
export const getSubbedChannelsInfo = async (guildId) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/subscribed-channels/${guildId}`;
    const data = {
        guildId: guildId,
    };
    const res = await apiClient.get(url, { data: data });
    const parseRes = GetSubbedChannelsResponseSchema.parse(res.data);
    return parseRes;
};
//# sourceMappingURL=getSubbedChannelsInfo.js.map