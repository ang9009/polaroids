import { ensureValidPSSessionId } from "../session/ensureValidPSSessionId";
// TODO: this should be stored in DB, and determined in setup stage
// TODO: this should also be a nested folder
const destinationFolderPath = "Test/test 2";
/**
 * Uploads a given array of files to PhotoStation.
 * @param files the array of files to be uploaded
 * @throws Error if the files argument is null, or if the file upload fails
 */
export const uploadFilesToPS = async (files) => {
    await ensureValidPSSessionId();
    if (files == null) {
        throw Error("Files argument is null");
    }
    for (const file of files) {
        await file.upload(destinationFolderPath);
    }
};
//# sourceMappingURL=uploadFilesToPS.js.map