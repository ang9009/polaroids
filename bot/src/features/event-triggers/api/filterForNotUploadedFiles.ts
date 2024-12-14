import axios from "axios";
import { FilterExistingFileIdsResponseSchema } from "shared/src/responses/file-responses/filterExistingFileIdsResponse";
import { FileData } from "../types/fileData";

/**
 * Filters a given list of files for files that have not already been uploaded.
 * @param files the files in question
 * @returns the filtered list of files.
 */
export const filterForNotUploadedFiles = async (files: FileData[]): Promise<FileData[]> => {
  const { DB_API_URL } = process.env;
  const url = `${DB_API_URL}/files/filter-existing-ids`;
  const ids = files.map((file) => file.discordId).join(",");
  const params = {
    fileIds: ids,
  };
  const res = await axios.get(url, { params });
  const parseRes = FilterExistingFileIdsResponseSchema.parse(res.data);
  const filteredIds = new Set(parseRes.filteredIds);

  const filteredFiles = files.filter((file) => filteredIds.has(file.discordId));
  return filteredFiles;
};
