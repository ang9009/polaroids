import { isAxiosError } from "axios";
import { EmbedBuilder } from "discord.js";
import { DbApiErrorType } from "shared/src/error-codes/dbApiErrorType";
import { DbErrorCode } from "shared/src/error-codes/dbErrorCode";
import { ApiErrorResponseSchema } from "shared/src/responses/error/apiErrorResponse";
import { PrimaryColors } from "../../../data/primaryColors";
import { getErrorEmbed } from "../../../utils/getErrorEmbed";
import { getFileDataFromAttachments } from "../../settings/helpers/getFileDataFromAttachments";
import { uploadFiles } from "../api/uploadFiles";
/**
 * Uploads the attachments in the given message to the specified album.
 * @param message the message that the attachments are associated with
 * @param albumName the name of album the attachments should be uploaded to
 */
export const uploadAttachmentsWithProgress = async (message, albumName) => {
    const { attachments, author: uploader } = message;
    const attachmentsList = [...attachments.values()];
    const attachmentFiles = await getFileDataFromAttachments(attachmentsList, message.createdAt, uploader);
    const uploadStatusEmbed = new EmbedBuilder()
        .setTitle("Attachment upload")
        .setFields([
        { name: "Status", value: `Uploading ${attachmentsList.length} file(s)...` },
        { name: "Album", value: albumName },
        { name: "Sent by", value: uploader.toString() },
    ])
        .setColor(PrimaryColors.PRIMARY_WHITE);
    const initialMessage = await message.reply({ embeds: [uploadStatusEmbed] });
    try {
        await uploadFiles(attachmentFiles, albumName, true);
    }
    catch (err) {
        let errMsg = "Something went wrong while uploading your media. Please try again.";
        if (isAxiosError(err)) {
            const parseErrorRes = ApiErrorResponseSchema.safeParse(err.response?.data);
            if (!parseErrorRes.success) {
                return;
            }
            else if (parseErrorRes.data.errorType === DbApiErrorType.DB_EXCEPTION) {
                const { dbErrorCode } = parseErrorRes.data;
                if (dbErrorCode === DbErrorCode.UNIQUE_CONSTRAINT_VIOLATION) {
                    errMsg = "The specified attachments have already been uploaded.";
                }
            }
        }
        const errEmbed = getErrorEmbed(errMsg);
        initialMessage.edit({ content: "", embeds: [errEmbed] });
        return;
    }
    uploadStatusEmbed
        .spliceFields(0, 1, {
        name: "Status",
        value: `Successfully uploaded ${attachmentFiles.length} file(s)`,
    })
        .setColor(PrimaryColors.SUCCESS_GREEN);
    initialMessage.edit({ embeds: [uploadStatusEmbed] });
};
//# sourceMappingURL=uploadFilesWithProgress.js.map