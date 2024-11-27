import axios from "axios";
import {
  IsSubscribedResponse,
  IsSubscribedResponseSchema,
} from "shared/subbed-channels-responses/isSubscribedResponse";
import { DbApiRoutes } from "../../../data/dbApiRoutes";
import { getDbApiUrl } from "../../../utils/getDbApiUrl";

/**
 * Checks if polaroids has subscribed to a given channel.
 * @param channelId the id of the channel in question
 * @returns a boolean
 * @throws Error if something goes wrong with the request
 */
export const channelIsSubscribed = async (channelId: string): Promise<IsSubscribedResponse> => {
  const url = getDbApiUrl(DbApiRoutes.SUBSCRIBED_CHANNELS, "is-subscribed", channelId);
  let res;
  try {
    res = await axios.get(url);
  } catch (err) {
    const msg = "channelIsSubscribed Axios request failed: " + err;
    console.error(msg);
    throw Error(msg);
  }

  const parsedRes = IsSubscribedResponseSchema.safeParse(res);
  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    const msg = "channelIsSubscribed request failed. Response: " + res.data;
    console.error(msg);
    throw Error(msg);
  }
};
