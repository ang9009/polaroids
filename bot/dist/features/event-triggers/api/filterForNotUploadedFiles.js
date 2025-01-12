import { FilterExistingFileIdsResponseSchema } from "shared/src/responses/files/filterExistingFileIds";
import { apiClient } from "../../../lib/axios";
/**
 * Filters a given list of files for files that have not already been uploaded.
 * @param files the files in question
 * @returns the filtered list of files.
 */
export const filterForNotUploadedFiles = async (files) => {
    const { DB_API_URL } = process.env;
    const url = `${DB_API_URL}/files/filter-existing-ids`;
    const ids = files.map((file) => file.discordId).join(",");
    const params = {
        fileIds: ids,
    };
    const res = await apiClient.get(url, { params });
    const parseRes = FilterExistingFileIdsResponseSchema.parse(res.data);
    const filteredIds = new Set(parseRes.filteredIds);
    const filteredFiles = files.filter((file) => filteredIds.has(file.discordId));
    return filteredFiles;
};
//# sourceMappingURL=filterForNotUploadedFiles.js.map