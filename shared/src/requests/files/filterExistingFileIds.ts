import { z } from "zod";

export const FilterExistingFileIdsRequestSchema = z.object({
  fileIds: z.string().transform((stringList) => stringList.split(",")),
});

export type FilterExistingFileIdsRequest = z.infer<typeof FilterExistingFileIdsRequestSchema>;
