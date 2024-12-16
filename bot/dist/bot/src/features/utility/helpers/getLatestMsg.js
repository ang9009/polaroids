/**
 * Returns the latest message in the channel the interaction occurred in.
 * @param channel the channel
 * @returns the message id
 */
export const getLatestMsg = async (channel) => {
    const latestMsgData = await channel.messages.fetch({ limit: 1 });
    const { value: latestMsg } = latestMsgData.values().next();
    if (!latestMsg) {
        throw Error("Failed to get latest message.");
    }
    return latestMsg;
};
//# sourceMappingURL=getLatestMsg.js.map