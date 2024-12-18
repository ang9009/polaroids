import { getFileDataFromAttachment } from "../../event-triggers/api/getFileDataFromAttachment";
/**
 * Retrieves data about all of the attachments sent in a channel.
 * @param latestMsg the latest message sent in the channel
 * @param channel the channel in question
 * @returns all the attachments sent in the channel as FileData objects
 */
export async function getChannelFilesData(latestMsg, channel) {
    const files = [];
    let currMsgPointer = latestMsg;
    while (currMsgPointer) {
        const msgPage = await channel.messages.fetch({
            limit: 100,
            cache: true,
            before: currMsgPointer.id,
        });
        for (const msg of msgPage.values()) {
            const msgAttachments = msg.attachments.values();
            for (const attachment of msgAttachments) {
                const fileData = await getFileDataFromAttachment(attachment, msg.createdAt, msg.author.id);
                files.push(fileData);
            }
        }
        currMsgPointer = msgPage.size !== 0 ? msgPage.at(msgPage.size - 1) : undefined;
    }
    return files;
}
//# sourceMappingURL=getChannelAttachments.js.map